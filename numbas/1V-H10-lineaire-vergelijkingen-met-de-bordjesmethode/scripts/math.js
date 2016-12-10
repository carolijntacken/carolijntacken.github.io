/*
Copyright 2011 Newcastle University

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

Numbas.queueScript('scripts/math.js',[],function() {

var math = Numbas.math = {

	re_scientificNumber: /(\-?(?:0|[1-9]\d*)(?:\.\d+)?)[eE]([\+\-]?\d+)/,
	
	//Operations to cope with complex numbers
	complex: function(re,im)
	{
		if(!im)
			return re;
		else
			return {re: re, im: im, complex: true, 
			toString: math.complexToString}
	},
	
	complexToString: function()
	{
		return math.niceNumber(this);
	},

	negate: function(n)
	{
		if(n.complex)
			return math.complex(-n.re,-n.im);
		else
			return -n;
	},

	conjugate: function(n)
	{
		if(n.complex)
			return math.complex(n.re,-n.im);
		else
			return n;
	},

	add: function(a,b)
	{
		if(a.complex)
		{
			if(b.complex)
				return math.complex(a.re+b.re, a.im + b.im);
			else
				return math.complex(a.re+b, a.im);
		}
		else
		{
			if(b.complex)
				return math.complex(a + b.re, b.im);
			else
				return a+b;
		}
	},

	sub: function(a,b)
	{
		if(a.complex)
		{
			if(b.complex)
				return math.complex(a.re-b.re, a.im - b.im);
			else
				return math.complex(a.re-b, a.im);
		}
		else
		{
			if(b.complex)
				return math.complex(a - b.re, -b.im);
			else
				return a-b;
		}
	},

	mul: function(a,b)
	{
		if(a.complex)
		{
			if(b.complex)
				return math.complex(a.re*b.re - a.im*b.im, a.re*b.im + a.im*b.re);
			else
				return math.complex(a.re*b, a.im*b);
		}
		else
		{
			if(b.complex)
				return math.complex(a*b.re, a*b.im);
			else
				return a*b;
		}
	},

	div: function(a,b)
	{
		if(a.complex)
		{
			if(b.complex)
			{
				var q = b.re*b.re + b.im*b.im;
				return math.complex((a.re*b.re + a.im*b.im)/q, (a.im*b.re - a.re*b.im)/q);
			}
			else
				return math.complex(a.re/b, a.im/b);
		}
		else
		{
			if(b.complex)
			{
				var q = b.re*b.re + b.im*b.im;
				return math.complex(a*b.re/q, -a*b.im/q);
			}
			else
				return a/b;
		}
	},

	pow: function(a,b)
	{
		if(a.complex && Numbas.util.isInt(b) && Math.abs(b)<100)
		{
			if(b<0)
				return math.div(1,math.pow(a,-b));
			if(b==0)
				return 1;
			var coeffs = math.binomialCoefficients(b);

			var re = 0;
			var im = 0;
			var sign = 1;
			for(var i=0;i<b;i+=2) {
				re += coeffs[i]*Math.pow(a.re,b-i)*Math.pow(a.im,i)*sign;
				im += coeffs[i+1]*Math.pow(a.re,b-i-1)*Math.pow(a.im,i+1)*sign;
				sign = -sign;
			}
			if(b%2==0)
				re += Math.pow(a.im,b)*sign;
			return math.complex(re,im);
		}
		if(a.complex || b.complex || (a<0 && math.fract(b)!=0))
		{
			if(!a.complex)
				a = {re: a, im: 0, complex: true};
			if(!b.complex)
				b = {re: b, im: 0, complex: true};
			var ss = a.re*a.re + a.im*a.im;
			var arg1 = math.arg(a);
			var mag = Math.pow(ss,b.re/2) * Math.exp(-b.im*arg1);
			var arg = b.re*arg1 + (b.im * Math.log(ss))/2;
			return math.complex(mag*Math.cos(arg), mag*Math.sin(arg));
		}
		else
		{
			return Math.pow(a,b);
		}
	},

	//return the nth row of Pascal's triangle
	binomialCoefficients: function(n) {
		var b = [1];
		var f = 1;

		for(var i=1;i<=n;i++) { 
			b.push( f*=(n+1-i)/i );
		}
		return b;
	},

	root: function(a,b)
	{
		return math.pow(a,div(1,b));
	},

	sqrt: function(n)
	{
		if(n.complex)
		{
			var r = math.abs(n);
			return math.complex( Math.sqrt((r+n.re)/2), (n.im<0 ? -1 : 1) * Math.sqrt((r-n.re)/2));
		}
		else if(n<0)
			return math.complex(0,Math.sqrt(-n));
		else
			return Math.sqrt(n)
	},

	log: function(n)
	{
		if(n.complex)
		{
			var mag = math.abs(n);
			var arg = math.arg(n);
			return math.complex(Math.log(mag), arg);
		}
		else if(n<0)
			return math.complex(Math.log(-n),Math.PI);
		else
			return Math.log(n);
	},

	exp: function(n)
	{
		if(n.complex)
		{
			return math.complex( Math.exp(n.re) * Math.cos(n.im), Math.exp(n.re) * Math.sin(n.im) );
		}
		else
			return Math.exp(n);
	},
	
	//magnitude of a number
	abs: function(n)
	{
		if(n.complex)
		{
			if(n.re==0)
				return Math.abs(n.im);
			else if(n.im==0)
				return Math.abs(n.re);
			else
				return Math.sqrt(n.re*n.re + n.im*n.im)
		}
		else
			return Math.abs(n);
	},

	//argument of a (complex) numbers
	arg: function(n)
	{
		if(n.complex)
			return Math.atan2(n.im,n.re);
		else
			return Math.atan2(0,n);
	},

	//real part of a number
	re: function(n)
	{
		if(n.complex)
			return n.re;
		else
			return n;
	},

	//imaginary part of a number
	im: function(n)
	{
		if(n.complex)
			return n.im;
		else
			return 0;
	},

	//Ordering relations
	lt: function(a,b)
	{
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.order complex numbers'));
		return a<b;
	},

	gt: function(a,b)
	{
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.order complex numbers'));
		return a>b;
	},

	leq: function(a,b)
	{
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.order complex numbers'));
		return a<=b;
	},
	
	geq: function(a,b)
	{
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.order complex numbers'));
		return a>=b;
	},

	eq: function(a,b)
	{
		if(a.complex)
		{
			if(b.complex)
				return (a.re==b.re && a.im==b.im);
			else
				return (a.re==b && a.im==0);
		}
		else
		{
			if(b.complex)
				return (a==b.re && b.im==0);
			else
				return a==b;
		}
	},

	max: function(a,b)
	{
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.order complex numbers'));
		return Math.max(a,b);
	},

	min: function(a,b)
	{
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.order complex numbers'));
		return Math.min(a,b);
	},
	
	neq: function(a,b)
	{
		return !math.eq(a,b);
	},

	//If number is a*pi^n, return n, otherwise return 0
	piDegree: function(n)
	{
		n=Math.abs(n);

		if(n>10000)	//so big numbers don't get rounded to a power of pi accidentally
			return 0;

		var degree,a;
		for(degree=1; (a=n/Math.pow(Math.PI,degree))>1 && Math.abs(a-math.round(a))>0.00000001; degree++) {}
		return( a>=1 ? degree : 0 );
	},

	//display a number nicely - rounds off to 10dp so floating point errors aren't displayed
	niceNumber: function(n,options)
	{
		options = options || {};
		if(n.complex)
		{
			var re = math.niceNumber(n.re,options);
			var im = math.niceNumber(n.im,options);
			if(math.precround(n.im,10)==0)
				return re+'';
			else if(math.precround(n.re,10)==0)
			{
				if(n.im==1)
					return 'i';
				else if(n.im==-1)
					return '-i';
				else
					return im+'*i';
			}
			else if(n.im<0)
			{
				if(n.im==-1)
					return re+' - i';
				else
					return re+im+'*i';
			}
			else
			{
				if(n.im==1)
					return re+' + '+'i';
				else
					return re+' + '+im+'*i';
			}
		}
		else	
		{
			if(n==Infinity)
				return 'infinity';

			var piD;
			if((piD = math.piDegree(n)) > 0)
				n /= Math.pow(Math.PI,piD);

			var out;
			switch(options.precisionType) {
			case 'sigfig':
				var precision = options.precision;
				out = math.siground(n,precision)+'';
				var sigFigs = math.countSigFigs(out);
				if(sigFigs<precision) {
					if(out.indexOf('.')==-1)
						out += '.';
					for(var i=0;i<precision-sigFigs;i++)
						out+='0';
				}
				break;
			case 'dp':
				var precision = options.precision;
				out = math.precround(n,precision)+'';
				var dp = math.countDP(out);
				if(dp<precision) {
					if(out.indexOf('.')==-1)
						out += '.';
					for(var i=0;i<precision-dp;i++)
						out+='0';
				}
				break;
			default:
				out = math.precround(n,10)+'';
			}
			switch(piD)
			{
			case 0:
				return out;
			case 1:
				if(n==1)
					return 'pi';
				else
					return out+'*pi';
			default:
				if(n==1)
					return 'pi^'+piD;
				else
					return out+'*pi'+piD;
			}
		}
	},
	//returns a random number in range [0..N-1]
	randomint: function(N) {
		return Math.floor(N*(Math.random()%1)); 
	},

	//a random shuffling of the numbers [0..N-1]
	deal: function(N) 
	{ 
		var J, K, Q = new Array(N);
		for (J=0 ; J<N ; J++)
			{ K = math.randomint(J+1) ; Q[J] = Q[K] ; Q[K] = J; }
		return Q; 
	},

	shuffle: function(list) {
		var l = list.length;
		var permutation = math.deal(l);
		var list2 = new Array(l);
		for(var i=0;i<l;i++) {
			list2[i]=(list[permutation[i]]);
		}
		return list2;
	},

	//returns the inverse of a shuffling
	inverse: function(l)
	{
		arr = new Array(l.length);
		for(var i=0;i<l.length;i++)
		{
			arr[l[i]]=i;
		}
		return arr;
	},

	//just the numbers from 1 to n in array!
	range: function(n)
	{
		var arr=new Array(n);
		for(var i=0;i<n;i++)
		{
			arr[i]=i;
		}
		return arr;
	},

	precround: function(a,b) {
		if(b.complex)
			throw(new Numbas.Error('math.precround.complex'));
		if(a.complex)
			return math.complex(math.precround(a.re,b),math.precround(a.im,b));
		else
		{
			b = Math.pow(10,b);

			//test to allow a bit of leeway to account for floating point errors
			//if a*10^b is less than 1e-9 away from having a five as the last digit of its whole part, round it up anyway
			var v = a*b*10 % 1;
			var d = (a>0 ? Math.floor : Math.ceil)(a*b*10 % 10);
			if(d==4 && 1-v<1e-9) {
				return Math.round(a*b+1)/b;
			}
			else if(d==-5 && v>-1e-9 && v<0) {
				return Math.round(a*b+1)/b;
			}

			return Math.round(a*b)/b;
		}
	},

	siground: function(a,b) {
		if(b.complex)
			throw(new Numbas.Error('math.siground.complex'));
		if(a.complex)
			return math.complex(math.siground(a.re,b),math.siground(a.im,b));
		else
		{
			var s = math.sign(a);
			if(a==0) { return 0; }
			if(a==Infinity || a==-Infinity) { return a; }
			b = Math.pow(10, b-Math.ceil(math.log10(s*a)));

			//test to allow a bit of leeway to account for floating point errors
			//if a*10^b is less than 1e-9 away from having a five as the last digit of its whole part, round it up anyway
			var v = a*b*10 % 1;
			var d = (a>0 ? Math.floor : Math.ceil)(a*b*10 % 10);
			if(d==4 && 1-v<1e-9) {
				return Math.round(a*b+1)/b;
			}
			else if(d==-5 && v>-1e-9 && v<0) {
				return Math.round(a*b+1)/b;
			}

			return Math.round(a*b)/b;
		}
	},

	countDP: function(n) {
		var m = n.match(/\.(\d*)$/);
		if(!m)
			return 0;
		else
			return m[1].length;
	},
	
	countSigFigs: function(n) {
		var m = n.match(/^(?:(\d$)|(?:([1-9]\d*[1-9])0*$)|([1-9]\d*\.\d+$)|(0\.0+$)|(?:0\.0*([1-9]\d*))$)/);
		if(!m)
			return 0;
		var sigFigs = m[1] || m[2] || m[3] || m[4] || m[5];
		return sigFigs.replace('.','').length;
	},

	factorial: function(n)
	{
		if( Numbas.util.isInt(n) && n>=0 )
		{
			if(n<=1) {
				return 1;
			}else{
				var j=1;
				for(var i=2;i<=n;i++)
				{
					j*=i;
				}
				return j;
			}
		}
		else	//gamma function extends factorial to non-ints and negative numbers
		{
			return math.gamma(math.add(n,1));
		}
	},

	//Lanczos approximation to the gamma function http://en.wikipedia.org/wiki/Lanczos_approximation#Simple_implementation
	gamma: function(n)
	{
		var g = 7;
		var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
		
		var mul = math.mul, div = math.div, exp = math.exp, neg = math.negate, pow = math.pow, sqrt = math.sqrt, sin = math.sin, add = math.add, sub = math.sub, pi = Math.PI, im = math.complex(0,1);
		
		if((n.complex && n.re<0.5) || (!n.complex && n<0.5))
		{
			return div(pi,mul(sin(mul(pi,n)),math.gamma(sub(1,n))));
		}
		else
		{
			n = sub(n,1);			//n -= 1
			var x = p[0];
			for(var i=1;i<g+2;i++)
			{
				x = add(x, div(p[i],add(n,i)));	// x += p[i]/(n+i)
			}
			var t = add(n,add(g,0.5));		// t = n+g+0.5
			return mul(sqrt(2*pi),mul(pow(t,add(n,0.5)),mul(exp(neg(t)),x)));	// return sqrt(2*pi)*t^(z+0.5)*exp(-t)*x
		}
	},

	log10: function(x)
	{
		return mul(math.log(x),Math.LOG10E);
	},

	radians: function(x) {
		return mul(x,Math.PI/180);
	},
	degrees: function(x) {
		return mul(x,180/Math.PI);
	},
	cos: function(x) {
		if(x.complex)
		{
			return math.complex(Math.cos(x.re)*math.cosh(x.im), -Math.sin(x.re)*math.sinh(x.im));
		}
		else
			return Math.cos(x);
	},
	sin: function(x) {
		if(x.complex)
		{
			return math.complex(Math.sin(x.re)*math.cosh(x.im), Math.cos(x.re)*math.sinh(x.im));
		}
		else
			return Math.sin(x);
	},
	tan: function(x) {
		if(x.complex)
			return div(math.sin(x),math.cos(x));
		else
			return Math.tan(x);
	},
	cosec: function(x) {
		return div(1,math.sin(x));
	},
	sec: function(x) {
		return div(1,math.cos(x));
	},
	cot: function(x) {
		return div(1,math.tan(x));
	},
	arcsin: function(x) {
		if(x.complex || math.abs(x)>1)
		{
			var i = math.complex(0,1), ni = math.complex(0,-1);
			var ex = add(mul(x,i),math.sqrt(sub(1,mul(x,x)))); //ix+sqrt(1-x^2)
			return mul(ni,math.log(ex));
		}
		else
			return Math.asin(x);
	},
	arccos: function(x) {
		if(x.complex || math.abs(x)>1)
		{
			var i = math.complex(0,1), ni = math.complex(0,-1);
			var ex = add(x, math.sqrt( sub(mul(x,x),1) ) );	//x+sqrt(x^2-1)
			var result = mul(ni,math.log(ex));
			if(math.re(result)<0 || math.re(result)==0 && math.im(result)<0)
				result = math.negate(result);
			return result;
		}
		else
			return Math.acos(x);
	},
	arctan: function(x) {
		if(x.complex)
		{
			var i = math.complex(0,1);
			var ex = div(add(i,x),sub(i,x));
			return mul(math.complex(0,0.5), math.log(ex));
		}
		else
			return Math.atan(x);
	},
	sinh: function(x) {
		if(x.complex)
			return div(sub(math.exp(x), math.exp(math.negate(x))),2);
		else
			return (Math.exp(x)-Math.exp(-x))/2;
	},
	cosh: function(x) {
		if(x.complex)
			return div(add(math.exp(x), math.exp(math.negate(x))),2);
		else
			return (Math.exp(x)+Math.exp(-x))/2
	},
	tanh: function(x) {
		return div(math.sinh(x),math.cosh(x));
	},
	cosech: function(x) {
		return div(1,math.sinh(x));
	},
	sech: function(x) {
		return div(1,math.cosh(x));
	},
	coth: function(x) {
		return div(1,math.tanh(x));
	},
	arcsinh: function(x) {
		if(x.complex)
			return math.log(add(x, math.sqrt(add(mul(x,x),1))));
		else
			return Math.log(x + Math.sqrt(x*x+1));
	},
	arccosh: function (x) {
		if(x.complex)
			return math.log(add(x, math.sqrt(sub(mul(x,x),1))));
		else
			return Math.log(x + Math.sqrt(x*x-1));
	},
	arctanh: function (x) {
		if(x.complex)
			return div(math.log(div(add(1,x),sub(1,x))),2);
		else
			return 0.5 * Math.log((1+x)/(1-x));
	},

	//round UP to nearest integer
	ceil: function(x) {
		if(x.complex)
			return math.complex(math.ceil(x.re),math.ceil(x.im));
		else
			return Math.ceil(x);
	},

	//round DOWN to nearest integer
	floor: function(x) {
		if(x.complex)
			return math.complex(math.floor(x.re),math.floor(x.im));
		else
			return Math.floor(x);
	},

	//round to nearest integer
	round: function(x) {
		if(x.complex)
			return math.complex(Math.round(x.re),Math.round(x.im));
		else
			return Math.round(x);
	},

	//chop off decimal part
	trunc: function(x) {
		if(x.complex)
			return math.complex(math.trunc(x.re),math.trunc(x.im));

		if(x>0) {
			return Math.floor(x);
		}else{
			return Math.ceil(x);
		}
	},
	fract: function(x) {
		if(x.complex)
			return math.complex(math.fract(x.re),math.fract(x.im));

		return x-math.trunc(x);
	},
	sign: function(x) {
		if(x.complex)
			return math.complex(math.sign(x.re),math.sign(x.im));

		if(x==0) {
			return 0;
		}else if (x>0) {
			return 1;
		}else {
			return -1;
		}
	},

	//return random real number between max and min
	randomrange: function(min,max)
	{
		return Math.random()*(max-min)+min;
	},

	//call as random([min,max,step])
	//returns random choice from 'min' to 'max' at 'step' intervals
	//if all the values in the range are appended to the list, eg [min,max,step,v1,v2,v3,...], just pick randomly from the values
	random: function(range)
	{
		if(range.length>3)	//if values in range are given after [min,max,step]
		{
			return math.choose(range.slice(3));
		}
		else
		{
			if(range[2]==0)
			{
				return math.randomrange(range[0],range[1]);
			}
			else
			{
				var diff = range[1]-range[0];
				var steps = diff/range[2];
				var n = Math.floor(math.randomrange(0,steps+1));
				return range[0]+n*range[2];
			}
		}
	},

	//removes all the values in the list `exclude` from the list `range`
	except: function(range,exclude) {
		range = range.filter(function(r) {
			for(var i=0;i<exclude.length;i++) {
				if(math.eq(r,exclude[i]))
					return false;
			}
			return true;
		});
		return range;
	},

	//choose one item from an array
	choose: function(selection)
	{
		if(selection.length==0)
			throw(new Numbas.Error('math.choose.empty selection'));
		var n = Math.floor(math.randomrange(0,selection.length));
		return selection[n];
	},


	// from http://dreaminginjavascript.wordpress.com/2008/11/08/combinations-and-permutations-in-javascript/ 
	//(public domain)
	productRange: function(a,b) {
		if(a>b)
			return 1;
		var product=a,i=a;
		while (i++<b) {
			product*=i;
		}
		return product;
	},
	 
	combinations: function(n,k) {
		if(n.complex || k.complex)
			throw(new Numbas.Error('math.combinations.complex'));

		k=Math.max(k,n-k);
		return math.productRange(k+1,n)/math.productRange(1,n-k);
	},

	permutations: function(n,k) {
		if(n.complex || k.complex)
			throw(new Numbas.Error('math.permutations.complex'));

		return math.productRange(k+1,n);
	},

	divides: function(a,b) {
		if(a.complex || b.complex || !Numbas.util.isInt(a) || !Numbas.util.isInt(b))
			return false;

		return (b % a) == 0;
	},

	gcf: function(a,b) {
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.gcf.complex'));

		if(Math.floor(a)!=a || Math.floor(b)!=b)
			return 1;
		a = Math.floor(Math.abs(a));
		b = Math.floor(Math.abs(b));
		
		var c=0;
		if(a<b) { c=a; a=b; b=c; }		

		if(b==0){return 1;}
		
		while(a % b != 0) {
			c=b;
			b=a % b;
			a=c;
		}
		return b;
	},

	lcm: function(a,b) {
		if(a.complex || b.complex)
			throw(new Numbas.Error('math.lcm.complex'));
		a = Math.floor(Math.abs(a));
		b = Math.floor(Math.abs(b));
		
		var c = math.gcf(a,b);
		return a*b/c;
	},


	defineRange: function(a,b)
	{
		if(a.complex)
			a=a.re;
		if(b.complex)
			b=b.re;
		return [a,b,1];
	},
	rangeSteps: function(a,b)
	{
		if(b.complex)
			b=b.re;
		return [a[0],a[1],b];
	},

	//Get a rational approximation to a real number by the continued fractions method
	//if accuracy is given, the returned answer will be within exp(-accuracy) of the original number
	rationalApproximation: function(n,accuracy)
	{
		if(accuracy===undefined)
			accuracy = 15;
		accuracy = Math.exp(-accuracy);

		var on = n;
		var e = Math.floor(n);
		if(e==n)
			return [n,1];
		var l = 0;
		var frac = [];
		while(Math.abs(on-e)>accuracy)
		{
			l+=1;
			var i = Math.floor(n);
			frac.push(i);
			n = 1/(n-i);
			var e = Infinity;
			for(var j=l-1;j>=0;j--)
			{
				e = frac[j]+1/e;
			}
		}
		var f = [1,0];
		for(j=l-1;j>=0;j--)
		{
			f = [frac[j]*f[0]+f[1],f[0]];
		}
		return f;
	}
};

var add = math.add, sub = math.sub, mul = math.mul, div = math.div, eq = math.eq, neq = math.neq, negate = math.negate;

//vector operations
//these operations are very lax about the dimensions of vectors - they stick zeroes in when pairs of vectors don't line up exactly
var vectormath = Numbas.vectormath = {
	negate: function(v) {
		return v.map(function(x) { return negate(x); });
	},

	add: function(a,b) {
		if(b.length>a.length)
		{
			var c = b;
			b = a;
			a = c;
		}
		return a.map(function(x,i){ return add(x,b[i]||0) });
	},

	sub: function(a,b) {
		if(b.length>a.length)
		{
			return b.map(function(x,i){ return sub(a[i]||0,x) });
		}
		else
		{
			return a.map(function(x,i){ return sub(x,b[i]||0) });
		}
	},

	//scalar multiplication - a should just be a number
	mul: function(k,v) {
		return v.map(function(x){ return mul(k,x) });
	},

	//dot product
	dot: function(a,b) {

		//check if A is a matrix object. If it's the right shape, we can use it anyway
		if('rows' in a)
		{
			if(a.rows==1)
				a = a[0];
			else if(a.columns==1)
				a = a.map(function(x){return x[0]});
			else
				throw(new Numbas.Error('vectormath.dot.matrix too big'));
		}
		//Same check for B
		if('rows' in b)
		{
			if(b.rows==1)
				b = b[0];
			else if(b.columns==1)
				b = b.map(function(x){return x[0]});
			else
				throw(new Numbas.Error('vectormath.dot.matrix too big'));
		}
		if(b.length>a.length)
		{
			var c = b;
			b = a;
			a = c;
		}
		return a.reduce(function(s,x,i){ return add(s,mul(x,b[i]||0)) },0);
	},

	//cross product
	cross: function(a,b) {
		//check if A is a matrix object. If it's the right shape, we can use it anyway
		if('rows' in a)
		{
			if(a.rows==1)
				a = a[0];
			else if(a.columns==1)
				a = a.map(function(x){return x[0]});
			else
				throw(new Numbas.Error('vectormath.cross.matrix too big'));
		}
		//Same check for B
		if('rows' in b)
		{
			if(b.rows==1)
				b = b[0];
			else if(b.columns==1)
				b = b.map(function(x){return x[0]});
			else
				throw(new Numbas.Error('vectormath.cross.matrix too big'));
		}

		if(a.length!=3 || b.length!=3)
			throw(new Numbas.Error('vectormath.cross.not 3d'));

		return [
				sub( mul(a[1],b[2]), mul(a[2],b[1]) ),
				sub( mul(a[2],b[0]), mul(a[0],b[2]) ),
				sub( mul(a[0],b[1]), mul(a[1],b[0]) )
				];
	},

	abs: function(a) {
		return Math.sqrt( a.reduce(function(s,x){ return s + mul(x,x); },0) );
	},

	eq: function(a,b) {
		if(b.length>a.length)
		{
			var c = b;
			b = a;
			a = c;
		}
		return a.reduce(function(s,x,i){return s && eq(x,b[i]||0)},true);
	},

	neq: function(a,b) {
		return !vectormath.eq(a,b);
	},

	//multiply vector v by matrix m
	matrixmul: function(m,v) {
		return m.map(function(row){
			return row.reduce(function(s,x,i){ return add(s,mul(x,v[i]||0)); },0);
		});
	},

	transpose: function(v) {
		var matrix = v.map(function(x){ return [x]; });
		matrix.rows = 1;
		matrix.columns = v.length;
		return matrix;
	}
}

//matrix operations
//again, these operations are lax about the sizes of things
var matrixmath = Numbas.matrixmath = {
	negate: function(m) {
		var matrix = [];
		for(var i=0;i<m.rows;i++) {
			matrix.push(m[i].map(function(x){ return negate(x) }));
		}
		matrix.rows = m.rows;
		matrix.columns = m.columns;
		return matrix;
	},

	add: function(a,b) {
		var rows = Math.max(a.rows,b.rows);
		var columns = Math.max(a.columns,b.columns);
		var matrix = [];
		for(var i=0;i<rows;i++)
		{
			var row = [];
			matrix.push(row);
			for(var j=0;j<columns;j++)
			{
				row[j] = add(a[i][j]||0,b[i][j]||0);
			}
		}
		matrix.rows = rows;
		matrix.columns = columns;
		return matrix;
	},
	sub: function(a,b) {
		var rows = Math.max(a.rows,b.rows);
		var columns = Math.max(a.columns,b.columns);
		var matrix = [];
		for(var i=0;i<rows;i++)
		{
			var row = [];
			matrix.push(row);
			for(var j=0;j<columns;j++)
			{
				row[j] = sub(a[i][j]||0,b[i][j]||0);
			}
		}
		matrix.rows = rows;
		matrix.columns = columns;
		return matrix;
	},
	
	//determinant
	//it pains me, but I'm only going to do up to 3x3 matrices here
	//maybe later I will do the LU-decomposition thing
	abs: function(m) {
		if(m.rows!=m.columns)
			throw(new Numbas.Error('matrixmath.abs.non-square'));

		//abstraction failure!
		switch(m.rows)
		{
		case 1:
			return m[0][0];
		case 2:
			return sub( mul(m[0][0],m[1][1]), mul(m[0][1],m[1][0]) );
		case 3:
			return add( sub(
							mul(m[0][0],sub(mul(m[1][1],m[2][2]),mul(m[1][2],m[2][1]))),
							mul(m[0][1],sub(mul(m[1][0],m[2][2]),mul(m[1][2],m[2][0])))
						),
						mul(m[0][2],sub(mul(m[1][0],m[2][1]),mul(m[1][1],m[2][0])))
					);
		default:
			throw(new Numbas.Error('matrixmath.abs.too big'));
		}
	},

	scalarmul: function(k,m) {
		var out = m.map(function(row){ return row.map(function(x){ return mul(k,x); }); });
		out.rows = m.rows;
		out.columns = m.columns;
		return out;
	},

	mul: function(a,b) {
		if(a.columns!=b.rows)
			throw(new Numbas.Error('matrixmath.mul.different sizes'));

		var out = [];
		out.rows = a.rows;
		out.columns = b.columns;
		for(var i=0;i<a.rows;i++)
		{
			var row = [];
			out.push(row);
			for(var j=0;j<b.columns;j++)
			{
				var s = 0;
				for(var k=0;k<a.columns;k++)
				{
					s = add(s,mul(a[i][k],b[k][j]));
				}
				row.push(s);
			}
		}
		return out;
	},

	eq: function(a,b) {
		var rows = Math.max(a.rows,b.rows);
		var columns = Math.max(a.columns,b.columns);
		for(var i=0;i<rows;i++)
		{
			var rowA = a[i] || [];
			var rowB = b[i] || [];
			for(var j=0;j<rows;j++)
			{
				if(!eq(rowA[j]||0,rowB[j]||0))
					return false;
			}
		}
		return true;
	},
	neq: function(a,b) {
		return !matrixmath.eq(a,b);
	},

	id: function(n) {
		var out = [];
		out.rows = out.columns = n;
		for(var i=0;i<n;i++)
		{
			var row = [];
			out.push(row);
			for(var j=0;j<n;j++)
				row.push(j==i ? 1 : 0);
		}
		return out;
	},

	transpose: function(m) {
		var out = [];
		out.rows = m.columns;
		out.columns = m.rows;

		for(var i=0;i<m.columns;i++)
		{
			var row = [];
			out.push(row);
			for(var j=0;j<m.rows;j++)
			{
				row.push(m[j][i]||0);
			}
		}
		return out;
	}
}

});
