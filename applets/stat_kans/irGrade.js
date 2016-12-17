///////////////////////////////////////////////////////////////////////////////
/* script irGrade:

interactive, real-time grading; html formatting; statistical functions, linear algebra

///////////////////////////////////////////////////////////////////////////////

 copyright (c) 1997-2013. P.B. Stark, statistics.berkeley.edu/~stark
 Version 2.3

///////////////////////////////////////////////////////////////////////////////

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    http://www.gnu.org/licenses/

///////////////////////////////////////////////////////////////////////////////

 Dependencies: jQuery, jQuery.bullseye, jQuery-ui

 !!!!Beginning of the code!!!!
*/

var irGradeModTime = '2013/4/26/2050'; // modification date and time
var today = (new Date()).toLocaleString();
var copyYr = '1997&ndash;2013. ';  // copyright years
var sticiRelPath = '.';            // relative path to the root of SticiGui
var courseBase = './Courses/';     // base for looking for course-specific files
var cssBase = 'sticiGuiDefault.css';  // css file
var graderActionURL = 'http://www.stat.berkeley.edu/cgi-bin/grader5'; // URL of grading scripts
var chapterTitles = [
                         ['Preface','preface'],
                         ['Introduction','howto'],
                         ['Reasoning and Fallacies','reasoning'],
                         ['Statistics','histograms'],
                         ['Measures of Location and Spread','location'],
                         ['Multivariate Data and Scatterplots','scatterplots'],
                         ['Association','association'],
                         ['Correlation and Association','correlation'],
                         ['Computing the Correlation Coefficient','computeR'],
                         ['Regression','regression'],
                         ['Regression Diagnostics','regressionDiagnostics'],
                         ['Errors in Regression','regressionErrors'],
                         ['Counting','counting'],
                         ['The Meaning of Probability: Theories of probability','probabilityPhilosophy'],
                         ['Set Theory: The Language of Probability','sets'],
                         ['Categorical Logic','categoricalLogic'],
                         ['Propositional Logic','logic'],
                         ['Probability: Axioms and Fundaments','probabilityAxioms'],
                         ['The &quot;Let\'s Make a Deal&quot; (Monty Hall) Problem','montyHall'],
                         ['Probability Meets Data','montyHallTest'],
                         ['Random Variables and Discrete Distributions','randomVariables'],
                         ['The Long Run and the Expected Value','expectation'],
                         ['Standard Error','standardError'],
                         ['The Normal Curve, the Central Limit Theorem, and Markov\'s' +
                          ' and Chebychev\'s Inequalities for Random Variables','clt'],
                         ['Sampling','sampling'],
                         ['Estimating Parameters from Simple Random Samples','estimation'],
                         ['Confidence Intervals','confidenceIntervals'],
                         ['Hypothesis Testing: Does Chance explain the Results?','testing'],
                         ['Does Treatment Have an Effect?','experiments'],
                         ['Testing Equality of Two Percentages','percentageTests'],
                         ['Approximate Hypothesis Tests: the <em>z</em> Test and the <em>t</em> Test',
                               'zTest'],
                         ['The Multinomial Distribution and the Chi-Squared Test for Goodness of Fit',
                               'chiSquare'],
                         ['A Case Study in Natural Resource Legislation: California Abalone Fisheries','abalone'],
                         ['A Case Study in Risk Assessment: Bovine Spongiform Encephalopathy and Import Restrictions','bse']
                    ];
var assignmentTitles = [
                         ['Have you read the syllabus and instructions?', // topic
                          'Have you read the syllabus and instructions?', // title
                          'syllabus',  // assignment link
                          'howto' // chapter link(s)
                         ],
                         ['Mathematical prerequisites',
                          'Mathematical prerequisites',
                          'prerequisites',
                          'preface'
                         ],
                         ['Reasoning and Fallacies',
                          'Reasoning and Fallacies',
                          'reasoning',
                          'reasoning'
                         ],
                         ['Data taxonomy, histograms and percentiles',
                          'Data taxonomy, histograms and percentiles',
                          'histograms',
                          'histograms'
                         ],
                         ['Measures of location and spread',
                          'Measures of location and spread: mean, median, mode, IRQ, ' +
                               'range, SD, Markov\'s and Chebychev\'s Inequalities',
                          'location',
                          'location'
                         ],
                         ['Multivariate Data, Scatterplots, and Association',
                          'Scatterplots and association: reading scatterplots, linearity ' +
                                'and nonlinearity, homoscedasticity and heteroscedasticity, outliers',
                          'scatterplots',
                          'scatterplots,association'
                         ],
                         ['Correlation and Association',
                          'Correlation: eyeball estimates of <em>r</em>, heuristics, facts, standard ' +
                          'units, computing the correlation coefficient',
                          'correlation',
                         'correlation,computeR'
                         ],
                         ['Regression',
                          'Regression: the equation of the regression line, interpolation, extrapolation',
                          'regression',
                          'regression'
                         ],
                         ['Regression Diagnostics, Errors in Regression',
                          'Regression diagnostics and regression errors: residual plots, ' +
                                 'regression fallacy, rms error of regression',
                          'regressionErrors',
                          'regressionDiagnostics,regressionErrors'
                         ],
                         ['Counting',
                          'Counting: fundamental rule of counting, combinations, permutations',
                          'counting',
                          'counting'
                         ],
                         ['The Meaning of Probability: Theories of Probability',
                          'The Meaning of Probability: Theories of Probability',
                          'probabilityPhilosophy',
                          'probabilityPhilosophy'
                         ],
                         ['Set Theory',
                          'Set Theory',
                          'sets',
                          'sets'
                         ],
                         ['Categorical Logic',
                          'Categorical Logic',
                          'categoricalLogic',
                          'categoricalLogic'
                         ],
                         ['Propositional Logic',
                          'Propositional Logic',
                          'logic',
                          'logic'
                         ],
                         ['Axioms of Probability',
                          'Axioms of Probability',
                          'probabilityAxioms',
                          'probabilityAxioms'
                         ],
                         ['Conditional probability and independence',
                          'Conditional probability, multiplication rule, independence, and Bayes\' rule',
                          'conditioning',
                          'montyHall'
                         ],
                         ['The sample sum and the Binomial distribution',
                          'The sample sum and the Binomial distribution',
                          'binomial',
                          'montyHallTest'
                         ],
                         ['Random Variables and Discrete Distributions',
                          'Random variables and discrete distributions',
                          'randomVariables',
                          'randomVariables'
                         ],
                         ['Expected Value',
                          'Expected Value',
                          'expectation',
                          'expectation'
                         ],
                         ['Standard Error',
                          'Standard Error',
                          'standardError',
                          'standardError'
                         ],
                         ['The Normal Curve, the Central Limit Theorem, and Markov\'s ' +
                            'and Chebychev\'s Inequalities for Random Variables',
                          'The Normal Curve, the Central Limit Theorem, and Markov\'s ' +
                            'and Chebychev\'s Inequalities for Random Variables',
                          'clt',
                           'clt'
                         ],
                         ['Sampling',
                          'Sample surveys and sampling designs',
                          'sampling',
                          'sampling'
                         ],
                         ['Estimating Parameters from Simple Random Samples',
                          'Estimating a parameter from a random sample; bias, SE, and MSE of estimators',
                          'estimation',
                          'estimation'
                         ],
                         ['Confidence Intervals',
                          'Confidence intervals for the population mean: the meaning of ' +
                               'confidence level and coverage probability',
                          'confidenceIntervals',
                          'confidenceIntervals'
                         ],
                         ['Hypothesis Testing',
                          'Hypothesis Testing: Does Chance explain the Results?',
                          'testing',
                          'testing'
                         ],
                         ['Does Treatment Have an Effect?',
                          'Does Treatment have an Effect?',
                          'experiments',
                          'experiments'
                         ],
                         ['Testing Whether Two Percentages are Equal',
                          'Testing whether two percentages are equal',
                          'percentageTests',
                          'percentageTests'
                         ],
                         ['Approximate Hypothesis Tests: the <em>z</em> Test and the <em>t</em> Test',
                          'Approximate Hypothesis Tests: the <em>z</em> Test and the <em>t</em> Test',
                          'zTest',
                          'zTest'
                         ],
                         ['The Multinomial Distribution and the Chi-Squared Test for Goodness of Fit',
                          'The Multinomial distribution and the Chi-Squared Test for Goodness of Fit',
                          'chiSquare',
                          'chiSquare'
                         ]
                        ];

var chapterNumbers = {};
var assignmentNumbers = {};
var i;
var j;
for (j = 0; j < chapterTitles.length ; j+=1) {
    chapterNumbers[chapterTitles[j][1]] = j;
}
for (j=0; j < assignmentTitles.length; j+=1) {
    assignmentNumbers[assignmentTitles[j][2]] = j;
}

var pureAssign = true;             // assignments based only on the chapters-to-assignment mapping
var cookieExpireDays = 7;          // days for the cookies to endure
var theChapter = null;             // current chapter
var theChapterTitle;               // title of the current chapter, if specified
var theCourse;                     // course-specific data
var openAssignNow;                 // server time when assignment page was opened
var enrollList;                    // hashed enrollment list
var newStyleAnswer = true;         // flag for pop-up versus inline
var figCtr = 1;                    // counter for figures
var pCtr = 1;                      // counter for problems
var qCtr = 1;                      // counter for questions
var tCtr = 1;                      // counter for tables
var xCtr = 1;                      // counter for examples
var fCtr = 0;                      // counter for footnotes
var key = [];                      // key for self-graded exercises
var boxList = [];                  // list of images for self-graded exercises
var setNum;                        // current problem set number
var isLab = false;                 // is this a problem set?
var acccessURL;
var dueURL;
var timeURL;
var slack = 11*60000;
var serverDate;                    // time according to the server
var pbsURL = 'http://statistics.berkeley.edu/~stark';
                                   // P.B. Stark's URL
var pbsRef = '<a href="' + pbsURL + '" target="_top">P.B. Stark</a>';
                                   // link to author
var fudgeFactor = 0.01;            // relative tolerance for imprecise numerical answers
var absFudge = 1.e-20;             // absolute tolerance for identically zero answers
var startXHT = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
                                     '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
var metaTagXHT = '<meta http-equiv="expires" content="0" />' +
               '<meta http-equiv="Content-Type" content="text/xhtml; charset=utf-8" />' +
               '<meta http-equiv="Content-Language" content="en-us" />' +
               '<meta name="author" content="P.B. Stark" />' +
               '<meta name="copyright" content="Copyright &copy;"' + copyYr +
                         ' by P.B. Stark, ' + pbsURL + ' All rights reserved." />' +
               '<meta http-equiv="Content-Script-Type" content="text/javascript" />' +
               '<meta http-equiv="Content-Style-Type" content="text/css" />' +
               '<meta name="keywords" content="statistics,probability,textbook,interactive,regression,' +
                                              'hypothesis,random,syllogism,logic,reasoning,fallacies">';
var cssLinkXHT = '<link rel="stylesheet" type="text/css" href="..' + cssBase.toString() + '" />';
var assignmentPrefix = 'PS-';
var inlinePrefix='Q#:a#:';
var bigPi = '3141592653';
var rmin = 2.3e-308;            // for numerical analysis
var eps = 2.3e-16;              // ditto
var maxIterations = 100;        // default iteration limit for iterative algorithms
var maxSubmits;                 // max submissions of each homework
var showWrongAfterSubmits;      // show which answers are wrong after this many submissions
var showQMarks = true;          // show labeling of each question answer area
var continueLab;
var htmStuff;
var dfStat;
var randSeed;                   // seed of random number generator
var CA = false;
var sectionContext;             // chapter-specific initialization script
var qImgSrc = '../Graphics/answer_unknown.gif';
var rightImgSrc = '../Graphics/answer_good.gif';
var wrongImgSrc = '../Graphics/answer_bad.gif';
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
        'q','r','s','t','u','v','w','x','y','z'
        ];
var ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
        'Q','R','S','T','U','V','W','X','Y','Z'
        ];
var Alphabet = ALPHABET;
var cardinals = ['zero','one','two','three','four','five','six','seven','eight','nine','ten',
            'eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen',
            'nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four',
            'twenty-five','twenty-six','twenty-seven','twenty-eight','twenty-nine','thirty',
            'thirty-one','thirty-two','thirty-three','thirty-four','thirty-five','thirty-six',
            'thirty-seven','thirty-eight','thirty-nine','fourty','fourty-one','fourty-two',
            'fourty-three','fourty-four','fourty-five','fourty-six','fourty-seven','fourty-eight',
            'fourty-nine','fifty','fifty-one','fifty-two','fifty-three','fifty-four','fifty-five',
            'fifty-six','fifty-seven','fifty-eight','fifty-nine','sixty','sixty-one','sixty-two',
            'sixty-three','sixty-four','sixty-five','sixty-six','sixty-seven','sixty-eight',
            'sixty-nine','seventy','seventy-one','seventy-two','seventy-three','seventy-four',
            'seventy-five','seventy-six','seventy-seven','seventy-eight','seventy-nine',
            'eighty','eighty-one','eighty-two','eighty-three','eighty-four','eighty-five',
            'eighty-six','eighty-seven','eighty-eight','eighty-nine','ninety',
            'ninety-one','ninety-two','ninety-three','ninety-four','ninety-five',
            'ninety-six','ninety-seven','ninety-eight','ninety-nine','one hundred'
            ];
var Cardinals = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
            'Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen',
            'Nineteen','Twenty','Twenty-one','Twenty-two','Twenty-three','Twenty-four',
            'Twenty-five','Twenty-six','Twenty-seven','Twenty-eight','Twenty-nine','Thirty',
            'Thirty-one','Thirty-two','Thirty-three','Thirty-four','Thirty-five','Thirty-six',
            'Thirty-seven','Thirty-eight','Thirty-nine','Fourty','Fourty-one','Fourty-two',
            'Fourty-three','Fourty-four','Fourty-five','Fourty-six','Fourty-seven','Fourty-eight',
            'Fourty-nine','Fifty','Fifty-one','Fifty-two','Fifty-three','Fifty-four','Fifty-five',
            'Fifty-six','Fifty-seven','Fifty-eight','Fifty-nine','Sixty','Sixty-one','Sixty-two',
            'Sixty-three','Sixty-four','Sixty-five','Sixty-six','Sixty-seven','Sixty-eight',
            'Sixty-nine','Seventy','Seventy-one','Seventy-two','Seventy-three','Seventy-four',
            'Seventy-five','Seventy-six','Seventy-seven','Seventy-eight','Seventy-nine',
            'Eighty','Eighty-one','Eighty-two','Eighty-three','Eighty-four','Eighty-five',
            'Eighty-six','Eighty-seven','Eighty-eight','Eighty-nine','Ninety',
            'Ninety-one','Ninety-two','Ninety-three','Ninety-four','Ninety-five',
            'Ninety-six','Ninety-seven','Ninety-eight','Ninety-nine','One hundred'
            ];
var ordinals = ['zeroth','first','second','third','fourth','fifth','sixth','seventh','eighth',
            'ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth',
            'sixteenth','seventeenth','eighteenth','ninteenth','twentieth','twenty-first',
            'twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth',
            'twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first',
            'thirty-second','thirty-third','thirty-fourth','thirty-fifth','thirty-sixth',
            'thirty-seventh','thirty-eighth','thirty-ninth','fourtieth','fourty-first',
            'fourty-second','fourty-third','fourty-fourth','fourty-fifth','fourty-sixth',
            'fourty-seventh','fourty-eighth','fourty-ninth','fiftieth','fifty-first',
            'fifty-second','fifty-third','fifty-fourth','fifty-fifth','fifty-sixth',
            'fifty-seventh','fifty-eighth','fifty-ninth','sixtieth','sixty-first',
            'sixty-second','sixty-third','sixty-fourth','sixty-fifth','sixty-sixth',
            'sixty-seventh','sixty-eighth','sixty-ninth','seventieth','seventy-first',
            'seventy-second','seventy-third','seventy-fourth','seventy-fifth','seventy-sixth',
            'seventy-seventh','seventy-eighth','seventy-ninth','eightieth','eighty-first',
            'eighty-second','eighty-third','eighty-fourth','eighty-fifth',
            'eighty-sixth','eighty-seventh','eighty-eighth','eighty-ninth','ninetieth',
            'ninety-first','ninety-second','ninety-third','ninety-fourth','ninety-fifth',
            'ninety-sixth','ninety-seventh','ninety-eighth','ninety-ninth','hundredth'
            ];
var iteratives = ['no times','once','twice','thrice'];
for (i=4; i < cardinals.length; i+=1) {
    iteratives[i] = cardinals[i] + ' times';
}
var primes = [ 2,      3,      5,      7,     11,     13,     17,     19,     23,     29,
              31,     37,     41,     43,     47,     53,     59,     61,     67,     71,
              73,     79,     83,     89,     97,    101,    103,    107,    109,    113,
              127,    131,    137,    139,    149,    151,    157,    163,    167,    173,
              179,    181,    191,    193,    197,    199,    211,    223,    227,    229,
              233,    239,    241,    251,    257,    263,    269,    271,    277,    281,
              283,    293,    307,    311,    313,    317,    331,    337,    347,    349,
              353,    359,    367,    373,    379,    383,    389,    397,    401,    409];
var nPrimes = [0, 0, 1, 2, 2, 3, 3, 4, 4, 4,           // 0-9
               4, 5, 5, 6, 6, 6, 6, 7, 7, 8,           // 10-19
               8, 8, 8, 9, 9, 9, 9, 9, 9, 10,          // 20-29
               10, 11, 11, 11, 11, 11, 11, 12, 12, 12, // 30-39
               12, 13, 13, 14, 14, 14, 14, 15, 15, 15, // 40-49
               15, 15, 15, 16];                        // 50-53
var allTheChars = '~\`!1@2#3$4%5^6&7*8(9)0_-+=QqWwEeRrTtYyUuIiOoPp{[}]|\\AaSsDdFfGgHhJjKkLl:;' +
                  '\"\'ZzXxCcVvBbNnMm<,>.?/';
var faces = ['Ace','two','three','four','five','six','seven','eight','nine','ten','Jack',
         'Queen','King'];
var suits = ['spades','hearts','diamonds','clubs'];
var colors = ['red','orange','yellow','green','blue','indigo','violet',
              'black','white','gray','silver','gold','brown','aqua','teal',
              'fuschia','magenta','cyan','sage','turquoise','chartreuse',
              'mauve','periwinkle','umber','brick','marigold','seafoam','coral',
              'purple','grape','cherry','beige','copper','sienna','baby blue'
             ];

// ========================================================================
//  FUNCTION LIBRARY
// ========================================================================

// ===============  STRING HANDLERS and HTML GENERATORS ===================

function trimBlanks(s){
    return (s ? s.replace(/^\s+|\s+$/g,'') : s);
}

function allBlanks(s) {
    return (s == null || s.replace(/^\s+|\s+$/g,'').length == 0);
}

function removeAllBlanks(s){
    return (s ? s.replace(/\s+/gm,'') : s);

}

function removeMarkup(s) { // removes html markup
    return (s ? s.replace(/<[^>]*>/gm,'') : s);
}

function replaceMarkupByChar(s,sub) { // replaces html markup with sub
    if (typeof(sub) == 'undefined' || sub == null || sub.length == 0) {
       sub = ' ';
    }
    return (s.replace(/<[^>]*>/gm, sub));
}

function removeSpecials(s) { // removes special characters markup EXCEPT brackets
    return (s ? s.replace(/[0123456789:;~`'"<>,.?\/+_@#$%^&*|!=-]+/gm,'') : s);
}

function removeNonLogicals(s) { // removes special characters markup EXCEPT brackets and logical symbols
    return (s ? s.replace(/[0123456789:;`'"<>,.?\/+_@#$%^*=-]+/gm,'') : s);
}

function trimToLowerCase(s) {
// trim trailing blanks, convert to lower case
    return (s ? (s.toLowerCase()).replace(/^\s+|\s+$/g,'') : s);
}

function removeCommas(s) { // removes commas from a string
    return (s ? s.replace(/,/gm,'') : s);
}

function removeString(str,s) { // removes instances of the string str from s.
    return (s ? s.replace(eval('/'+str+'/gm'),'') : s);
}

function removeStrings(strArr,s) {
    var j;
    for (j=0; j < strArr.length; j+=1) {
        s = removeString(strArr[j], s);
    }
    return s;
}

function parsePercent(s) {
// parse a number that contains a % sign to turn it into a decimal fraction
    var value;
    if (s.indexOf('%') == -1) {
        value = parseFloat(trimBlanks(removeCommas(s)))
    } else {
        while (s.indexOf('%') != -1) {
            s = s.substring(0,s.indexOf('%')) +
                s.substring(s.indexOf('%')+1,s.length)
        }
        value = parseFloat(trimBlanks(removeCommas(s)))/100;
    }
    return value;
}

function evalNum(s) { // try to evaluate a string as a numeric value
    var value;
    var dmy = s + ' ';
    dmy = dmy.replace(/\%/g,'\/100');
    dmy = dmy.replace(/,/g,'');
    if ( typeof(s) == 'undefined' || s == null || !s.match(/[^ ]/) ) {
        value = 'NaN';
    } else if ( dmy.match(/[^1234567890+*\/.ed() -]/i) ) {
        value = 'NaN';
    } else if ( !dmy.match(/[1234567890]/) ) {
        value = 'NaN';
    } else {
        try {
            eval('value = ' + dmy + ';');
        } catch(e) {
            value = 'NaN';
        }
    }
    return value;
}

function parseMultiple(id) {
  // pre-processes multiple selections so that checkAnswer can be used to grade them
    return ($('#' + id ).val() || []).join(',');
}

function parseRadio(c) {
  // pre-processes multiple selections so that checkAnswer can be used to grade them
    return  $('.' + c + ' :checked').val();
}

function findNum(s) {
// if s is an integer or its string representation, returns s.
// if not, tries to remove characters to
// leave an int, and returns that int.
    var i = parseInt(s);
    var j;
    if ( !isNaN(i)) {
        return i;
    } else {
        var q = '';
        for (j=0; j < s.length; j+=1) {
            var dum = q;
            if (!isNaN(parseInt(dum + s.charAt(j)))) {
                q += s.charAt(j);
            }
        }
        return q;
    }
}

function vFindNum(s) { // finds numbers in a string array
    var a = new Array(s.length);
    var i;
    for (i=0; i < s.length; i+=1) {
        a[i] = findNum(s[i]);
    }
    return a;
}

// ============================================================================
// ========================= COOKIE MANIPULATION ==============================

function expireTimeString(ed) {
    var now = new Date();
    var expire = new Date();
    var cookDays;
    if (typeof(ed) == 'undefined' || ed == null) {
        cookDays = cookieExpireDays;
    } else {
        cookDays = ed;
    }
    expire.setTime(now.getTime() + cookDays*60*60*1000*24);
    return expire.toGMTString();
}

function getCookieVal(cook,key){ // gets the value of key within the cookie cook
    var searchStr = cook + '&';
    var val = null;
    var pat = key + '=';
    var inx = searchStr.indexOf(pat);
    if (inx > -1){
        searchStr = searchStr.substring(inx + pat.length, searchStr.length);
        val = unescape(searchStr.substring(0, searchStr.indexOf('&')));
    }
    return val;
}

function deleteAllCookies() {
     var et = expireTimeString(-1);
     var clist = document.cookie.split(';');
     var j;
     for (j=0; j < clist.length; j+=1) {
         var cook = clist[j].split('=');
         document.cookie = cook[0] + '= ;EXPIRES=' + et;
     }
     return true;
}

function getCookieArray(cook,stem,len) { // gets an array from the cookie
    var ansArr = new Array(len);
    var i;
    for (i=0; i < len; i+=1) {
        ansArr[i] = getCookieVal(cook, stem + i.toString());
    }
    return ansArr;
}

function setCookieArray(arr,stem) { // make a cookie-like string from the array arr
    var ansStr = '';
    var i;
    for (i=0; i < arr.length; i+=1) {
        ansStr += stem + i.toString() + '=' + arr[i] + '&';
    }
    if (ansStr.substr(ansStr.length-1,1) == '&') {
        ansStr = ansStr.substring(0, ansStr.length - 1);
    }
    return ansStr;
}

// ============================================================================
// =================== PROBLEM AND GRADING, SPECIAL MARKUP ====================

function numToMultiple(opt,ans) { // finds the multiple choice closest to ans
    var dif = Math.abs(parsePercent(opt[0]) - ans);
    var aVal = 'a';
    var i;
    for (i=1; i < opt.length; i+=1) {
        var d2 = Math.abs(parsePercent(opt[i]) - ans);
        if (d2 < dif) {
            dif = d2;
            aVal = alphabet[i];
        }
    }
    return aVal;
}

function hiddenInput(string, val){  // hidden input with id, name, and class ="string" and value="val"
    return '<input type="hidden" class="' + string + '" id="' + string + '" name="' + string + '" value="' + val + '" />';
}

function citeChapter(s) {
    var j = chapterNumbers[s];
    return '<span class="chapterCite">Chapter ' + j.toString() + ', ' + chapterTitles[j][0] + '</span>';
}

function citeLinkChapter(s, anchor, relpath) {
    if (typeof(anchor) == 'undefined' || anchor == null || anchor.length == 0) {
         anchor = '';
    } else {
         anchor = '#' + anchor;
    }
    if (typeof(relpath) == 'undefined' || relpath == null || relpath.length == 0) {
         relpath = './';
    }
    return '<a class="chapterLink" target="_self" href="' + relpath + s + anchor + '.htm">' + citeChapter(s) + '</a>';
}

function writeCaption(ref, q, capt, align) { // start a numbered caption.
    if (typeof(align) == 'undefined' || align == null) {
            align='center';
    }
    var linkStr = capt.replace(/[^a-z0-9]/gi,'_');
    var qStr = '<div class="caption" id="' + linkStr +'"><p align="' + align + '">' + ref + '-' + q + ': ' + capt + '</p></div>';
    document.writeln(qStr);
    if (!document.getElementById(linkStr).parentNode.id) {
          document.getElementById(linkStr).parentNode.id = linkStr + '_parent';
    }
}

function writePlainCaption(capt, align) { // start a plain caption.
    if (typeof(align) == 'undefined' || align == null) {
            align='center';
    }
    var linkStr = capt.replace(/[^a-z0-9]/gi,'_');
    var qStr = '<div class="caption" id="' + linkStr +'"><p align="' + align + '">' + ref + '-' + q + ': ' + capt +
                '</p></div>';
    document.writeln(qStr);
    if (!document.getElementById(linkStr).parentNode.id) {
          document.getElementById(linkStr).parentNode.id = linkStr + '_parent';
    }
}

function writeTableCaption(capt, align) { //
    writeCaption('Table&nbsp;' + chapterNumbers[cNum].toString(), tCtr++, capt, align);
}

function writeFigureCaption(capt, align) {
    writeCaption('Figure&nbsp;' + chapterNumbers[cNum].toString(), figCtr++, capt, align);
}

function writeExampleCaption(capt, align) {
    if (typeof(align) == 'undefined' || align == null) {
            align = 'left';
    }
    writeCaption('Example&nbsp;' + chapterNumbers[cNum].toString(), xCtr++, capt, align);
}

function citeTable(num, print) {
    if (typeof(num) == 'undefined' || num == null) {
            num = tCtr;
    }
    if (typeof(print) == 'undefined' || print == null) {
            print = true;
    }
    var cStr = '<span class="chapterCite">Table&nbsp;' + chapterNumbers[cNum].toString() + '-' + num.toString() +
               '</span> ';
    if (print) {
            document.writeln(cStr);
            return true;
    } else {
            return cStr;
    }
}

function citeFig(num, print) {
    if (typeof(num) == 'undefined' || num == null) {
            num = figCtr;
    }
    if (typeof(print) == 'undefined' || print == null) {
            print = true;
    }
    var cStr = '<span class="chapterCite">Figure&nbsp;' + chapterNumbers[cNum].toString() + '-' +
               num.toString() + '</span> ';
    if (print) {
            document.writeln(cStr);
            return true;
    } else {
            return cStr;
    }
}

function citeExample(num, print) {
    if (typeof(num) == 'undefined' || num == null) {
            num = xCtr;
    }
    if (typeof(print) == 'undefined' || print == null) {
            print = true;
    }
    var cStr = '<span class="chapterCite">Example&nbsp;' + chapterNumbers[cNum].toString() + '-' +
               num.toString() + '</span> ';
    if (print) {
            document.writeln(cStr);
            return true;
    } else {
            return cStr;
    }
}

function startProblem(q) {  // writes html to start a problem, numbered q
    chStr = '';
    if (typeof(chapterNumbers[cNum]) != 'undefined' && chapterNumbers[cNum] != null) {
        chStr += (chapterNumbers[cNum]).toString() + '-';
    }
    var ref;
    if (HI) {
        ref = "Problem&nbsp;" + chStr + q.toString();
    } else {
        ref = "Exercise&nbsp;" + chStr + q.toString();
    }
    var linkStr = 'P-' + q.toString();
    var s = '<a id="' + linkStr + '"></a><p>&nbsp;</p><p><strong>' + ref + '.</strong>';
    return s;
}

function writeSelectExercise(mult, q, opt, ans) {
    document.writeln(selectExerciseString(mult, q, opt, ans));
    return true;
}

function selectExerciseString(mult, q, opt, ans) {
    var id = 'Q' + q.toString();
    var s = selectExercise(mult, id, opt, CA);
    if (showQMarks) {
            document.writeln('(Q' + q + ')');
    }
    if (CA) {
        if (mult) {
            s += '<input type="button" id="B' + q +
                '" value="Check Answer" onclick="checkAnswer(\'' + id +
                '\',parseMultiple(\'' + id + '\'))" />';
        }
        if (newStyleAnswer != null && newStyleAnswer) {
            boxList[q - 1] = document.images.length;
            s += qCheckString(q);
        }
    }
    key[q - 1] = crypt(ans, randSeed.toString());
    return s;
}

function qCheckString(q) {
    var s = '<a href="javascript:void();" target="_self"' +
            ' onClick="giveAnswer(\'Q' + q.toString() + '\');return false;">' +
            ' <img src="' + qImgSrc + '" ' +
            ' border="1" align="top" title="see the answer" /></a>' +
            ' <span class="ansSpan" id="ansSpan' + q.toString() + '"></span>';
   return s;
}

function areaExercise(rows,cols,q,ca) {
  // text input area of "size" size, id q, and appropriate onChange()
    var s = '<br><textarea rows="' + rows + '" cols="' + cols + '" id="' + q + '" name="' + q + '" class="' + q + '" ';
    if (ca == null || ca ) {
        s += 'onChange="checkAnswer(id,value);"';
    }
    s += ' ></textarea>';
    return s;
}

function writeAreaExercise(rows, cols, q, ans) {
    if (showQMarks) {
          document.writeln('(Q' + q + ')');
    }
    var thisCA = (ans.trim() != '?') ? CA : false;
    document.writeln(areaExercise(rows, cols, 'Q' + q, thisCA ));
    if (thisCA) {
        if (newStyleAnswer != null && newStyleAnswer) {
           boxList[q - 1] = document.images.length;
           document.writeln(qCheckString(q));
        }
    }
    key[q - 1] = crypt(ans, randSeed.toString());
    return true;
}

function textExercise(size,q,ca) {
  // text input area of "size" size, id q, class q and appropriate onChange()
    var s = '<input type="text" size="' + size + '" id="' + q + '" name="' + q + '" class="' + q + '" ';
    if (ca == null || ca ) {
        s += 'onChange="checkAnswer(id,value);"';
    }
    s += ' />';
    return s;
}

function textProblem(size,q) {  // makes text input area of "size" size, id, name and class "q"
    var s = '<input type="text" size="' + size + '" id="' + q + '" name="' + q + '" class="' + q + '" />';
    return s;
}

function writeTextExercise(size, q, ans) {  // does all the printing for a textfield exercise
    if (showQMarks) {
            document.writeln('(Q' + q + ')');
    }
    document.writeln(textExercise(size, 'Q' + q, CA));
    if (CA) {
        if (newStyleAnswer != null && newStyleAnswer) {
            boxList[q - 1] = document.images.length;
            document.writeln(qCheckString(q));
        }
    }
    key[q - 1] = crypt(ans, randSeed.toString());
    return true;
}

function writeRadioExercise(q, opt, ans) {  // write a radio exercise
    document.writeln(radioExercise('Q'+q, opt, CA));
    if (showQMarks) {
            document.writeln('(Q' + q + ')');
    }
    if (CA) {
        if  (newStyleAnswer != null && newStyleAnswer) {
            boxList[q - 1] = document.images.length;
            document.writeln(qCheckString(q));
        }
    }
    key[q-1] = crypt(ans, randSeed.toString());
    return true;
}

function radioExercise(q, opt, ca){  // makes a collection of radio inputs.
    var s = '';
    var oplen = opt.length;
    var i;
    for (i=0; i < oplen; i+=1) {
        s  += '<input type="radio" id="' + q + '_' + i + '" name="' + q + '" class="' + q + '" value="' + alphabet[i] + '" ';
        if (ca == null || ca) {
            s += 'onClick="checkAnswer(name,value);"';
        }
        s += ' />\n' + alphabet[i] + ') ' + opt[i] + '<br />\n';
    }
    return s;
}

function selectExercise(mult, q, opt, ca) {
   // makes a select with multiple=mult, id q.
   // if mult, makes the size large enough to show all options.
   // otherwise size=1;  opt is a 1 by array.
    var s;
    var i;
    var size;
    var oplen = opt.length;
    if (mult) { // leave room for all the answers to be visible.
        size= oplen+1;
    } else {
        size = 1;
    }
    var s = '<select id="' + q + '" class="' + q + '" name="' + q + '" size="' + size + '" ';
    if (mult) {
        s += 'multiple="' + mult + '" ';
    }
    if ((ca == null || ca) && !mult) {
        s += 'onChange ="checkAnswer(id,options[selectedIndex].value);"';
    }
    s += '>\n <option>?</option>\n';
    if (oplen <= 26) {
        for (var i=0; i < oplen; i+=1) {
            s += '<option value="' + alphabet[i] + '">' + ALPHABET[i] +
                ': ' + opt[i] + '</option>\n';
        }
    } else {
        for (i=0; i < oplen; i+=1) {
            s += '<option value="' + (i+1).toString() + '">' +
                (i+1).toString() + ': ' + opt[i] + '</option>\n';
        }
    }
    s += '</select>';
    return s;
}

function functionalGradeString(fn, ans) {
    return('@ansText = \'' + ans + '\';\n' +
           'function checkProblem(r) {\n' +
                     fn + '\n}');
}

function scoreProblem(truth,response){
    var ansVec = parseKey(truth);
    var qTypeCode = ansVec[0];  // type of question
    var answer = ansVec[1];     // the correct answer or function that evaluates correctness
    response = trimToLowerCase(response);  // student response
    var rsp;
    var correctness;
    var i;
    var k;
    if (response == null) {
        correctness = false;
    } else if (qTypeCode == 'FN') {  // functional solution
        eval(answer);
        correctness = eval('checkProblem(response)');
    } else if (qTypeCode == 'WC') {  // wildcard
        rsp = trimBlanks(response);
        correctness = (rsp.length > 0) ? true : false;
    } else if (qTypeCode == 'NG') { // not machine graded
        correctness = null;
    } else if (qTypeCode == 'LA') {  // literal answer
        // try to parse as number; if fail, take literal.
        rsp = evalNum(response);
        if (!isNaN(rsp)) {
            response = rsp;
        }
        correctness = (answer.toString() == response.toString()) ? true : false;
    } else if (qTypeCode == 'RG') {  // numerical range
        var r = evalNum(response);
        correctness = ((answer[0] <= r) && (r <= answer[1])) ? true : false;
    } else if (qTypeCode == 'MA') {  // multiple allowed
        resArray = response.split(',');
        resArray.sort()
        var matches = [];
        for (k=0; k < resArray.length; k+=1) {
            matches[k] = 0;
            for (i=0; i < answer.length; i+=1) {
                if (resArray[k] == answer[i]) {
                    matches[k] = 1;
                }
            }
        }
        correctness = (vMinMax(matches)[0] == 1) ? true : false;
    } else if (qTypeCode == 'MR') { // multiple required
        correctness = false;
        resArray = response.split(',');
        resArray.sort()
        if (resArray.length == answer.length) {
            correctness = true;
            for (i=0; i < answer.length; i+=1 ) {
                if (answer[i] != trimToLowerCase(resArray[i])) {
                    correctness = false;
                }
            }
        }
    }
    return correctness;
}

function parseKey(s) {
// parses the answer keys for interactive grading.  See header.
// Returns the question type code, the answer, and a text representation of the answer.
// The answer can be a function that evaluates the correctness of the response, or
// one of several types of answers: literals, numerical ranges, multiple-selects, wildcards, ...
    s = trimBlanks(s) // remove trailing blanks
    var answer;
    var ansText;
    var i;
    if (s.indexOf('@') == 0) { // answer is a function
        answer = s.substring(1,s.length);
        qTypeCode = 'FN';                  // answer is type function (FN)
        try {
            eval(answer);
        } catch(err) {
            alert('Error #1 in irGrade.parseKey(): functional key does not parse!');
        }
        if (ansText == null || removeAllBlanks(ansText).length == 0 ) {
               ansText = 'Sorry, there is no text representation of the answer to this question.';
        }
    } else if (s.indexOf(':') != -1) { // solution is a range
        answer = s.toLowerCase().split(':')
        if (answer.length != 2) { alert('Error #2 in irGrade.parseKey(): bad range syntax!') }
        qTypeCode = 'RG';                   // answer is of type range (RG)
        for (i=0; i < answer.length; i+=1) {
            answer[i] = parsePercent(answer[i]);
            if (isNaN(answer[i])){
                alert('Error #3 in irGrade.parseKey(): unparsable number in range!');
            }
        }
        ansText = answer[0] + ' to ' + answer[1];
    } else if (s.indexOf('&') != -1 ){ // multiple required answers; assume all
                                       // are letters
        answer = s.toLowerCase().split('&');
        qTypeCode = 'MR';                   // answer is of type multiple required (MR)
        for (i=0; i < answer.length; i+=1 ) {
            answer[i] = trimBlanks(answer[i].toLowerCase());
            answer.sort();
        }
        ansText = answer[0];
        for (i=1; i < answer.length; i+=1) {
            ansText += ' and ' + answer[i];
        }
    } else if (s.indexOf('|') != -1 ){ // multiple answers accepted; assume all
                                       // are letters
        answer = s.toLowerCase().split('|');
        qTypeCode = 'MA';                   // answer is of type multiple accepted (MA)
        for (i=0; i < answer.length; i+=1 ) {
            answer[i] = trimBlanks(answer[i].toLowerCase());
        }
        ansText = answer[0];
        for (i=1; i < answer.length; i+=1) {
            ansText += ' or ' + answer[i];
        }
    } else if (s == '*') {
        qTypeCode = 'WC';                   // wildcard
        answer = '*';
        ansText = 'any non-blank answer';
    } else if (s == '?') {
        qTypeCode = 'NG';                   // non-graded
        answer = '?';
        ansText = 'not machine graded';
    } else {                           // answer is literal
        qTypeCode = 'LA';                   // literal answer (LA)
        answer = parsePercent(s);
        if (isNaN(answer)) {
            answer = trimBlanks(s.toLowerCase());
        }
        ansText = answer;
    }
    return [qTypeCode,answer,ansText];
}

function setCourseSpecs() {
    course = theCourse[1];
    courseName = theCourse[2];
    teacher = theCourse[3];
    teacherName = theCourse[4];
    gPath = theCourse[5];
    maxSubmits = theCourse[6];
    showWrongAfterSubmits = theCourse[7];
    dueURL = theCourse[8];
    accessURL = theCourse[9];
    timeURL = theCourse[10];
    if (theCourse[11]) {
        pureAssign = false;
        assignURL = theCourse[11];
    }
    dFile = cRoot + course + dFileBase;
    sFile = cRoot + course + sFileBase;
    $(document).ready(function() {
            $("#courseSelector").text(courseName + ': ' + teacherName)
                                .css('color', 'blue');
    });
    return true;
}

function getGrades(theForm) {
    if (validateLablet(theForm)) {
        myKey = CryptoJS.SHA256(trimToLowerCase(theForm.sid.value) + ',' + trimToLowerCase(theForm.email.value)).toString();
        $('#scores').html('<p class="center">Retrieving scores <blink>&hellip;</blink></p>');
        scoresURL = scoreBase + 'class=' + course + '&teacher=' + teacher + '&gpath=' + gPath + '&sids';
        var reg = new RegExp('^\\s*(' + myKey + '|KEY)\\s*', 'gi');
        getURL = $.ajax({
                          type: 'GET',
                          url:   scoresURL
                        })
                        .done(function(data) {
                            $('#scores').html('<p class="center">Scores for SID ' + theForm.sid.value + '</p>');
                            var scTab = $('<table class="dataTable"/>');
                            var rt = data.split('\n');
                            $.each(rt, function(i, r) {
                                  if (r.match(reg)) {
                                      row = $('<tr />');
                                      $.each( r.replace(reg,'')
                                               .replace(/NaN/,'----')
                                               .replace(/\s+/gm,' ')
                                               .split(' '), function(j, el) {
                                                                  if(el) {$('<td />' ).html(el).appendTo(row);}
                                      });
                                      row.appendTo(scTab);
                                  }
                            });
                            $('#scores').append(scTab);
                       })
                       .fail(function() {
                            alert('failed to retrieve scores');
                            $('#scores').html('<p>Unable to retrieve scores for SID ' +
                                              theForm.sid.value + ' at this time.</p>')
                                        .css('visibility', 'visible');
                       });
            }
}


function spawnProblem(theForm,setName,relPath) {
    if (typeof(relPath) == 'undefined' || relPath == null || relPath.length == 0) {
        relPath = '..';
    }
    if (validateLablet(theForm)) {
        var ck = document.cookie;
//        var fname = formStemName + assignmentNumbers[setName].toString();
        var assigned = assign[setName] && (assign[setName][1] == 'ready');
        if (!assigned) {
                    alert('Error #1 in irGrade.spawnProblem(): This has not been assigned yet.\n Try again later.');
                    return false;
        } else {
            var sstr =  crypt('sid' + theForm.sid.value, theForm.sid.value) + '=';
            if (ck.indexOf(sstr) < 0){
                var rs = (theForm.sid.value).toString().replace(/[^0-9]/g, '7');
                while (rs.length < 10){
                     rs += rs;
                }
                randSeed = parseInt(rs.substr(0,Math.min(10,rs.length)));
                setSubmitCookie('sid', theForm, true);
                ck = document.cookie;
                if (ck.indexOf(sstr) < 0) {
                    alert('Error #2 in irGrade.spawnProblem()!\n' +
                          'Make sure your browser is configured to accept cookies.\n' +
                          'Clear existing cookies and try again.');
                    return false;
                }
            }
            var ss = ck.substring(ck.indexOf(sstr) + sstr.length, ck.length);
            if (ss.indexOf(';') > -1) {
                ss = ss.substring(0,ss.indexOf(';'));
            }
            var cl = crypt(ss, theForm.sid.value);
            var instr = relPath + '/Problems/' + setName + 'i.htm';
            var appl  = relPath + '/Problems/' + setName + 'j.htm';
            lablet = open('','lablet','toolbar=no,location=no,directories=no,status=no,'+
                'scrollbars=yes,resizable=yes,height=600,width=800');
            lablet.document.open();
            lablet.continueLab = cl;
            var pastDue = (new Date(assign[setName][0]) < new Date());
            var sAns = assign[setName][2] == 'show_answers' || ((assign[setName][2] == 'automatic') && pastDue);
            var allowSubmit = !pastDue && (assign[setName][1] == 'ready');
            lablet.sAns = sAns;
            lablet.allowSubmit = allowSubmit;
            lablet.dFile = dFile;
            lablet.course = course;
            lablet.teacher = teacher;
            lablet.maxSubmits = assign[setName][3] ? assign[setName][3] : maxSubmits ;
            lablet.showWrongAfterSubmits = assign[setName][4] ? assign[setName][4] : showWrongAfterSubmits;
            lablet.formname = setName;
            lablet.theChapter = setName;
            lablet.assignmentname = setName;
            var qStr = startXHT + '<head>' + metaTagXHT + styleSheetRef(relPath) +
                                   '<title>SticiGui Assignment ' + i.toString() + '</title>' +
                                   '<script language="JavaScript1.8" type="text/javascript" src="../../Java/sticigui.js"></script>' +
                                   '<script language="JavaScript1.8" type="text/javascript" src="../../Java/irGrade.js"></script>' +
                                   '</head>';
            lablet.document.writeln('<frameset rows="*,300"><frame id="instrWin" src="' + instr + '"' +
                ' frameborder="1" framespacing="0" border="1" /><frame id="appletWin" src="' + appl + '"' +
                ' frameborder="1" framespacing="0" border="1" /></frameset></html>');
            lablet.document.close();
            return true;
    }
  } else {
     return false;
  }
}

// log headers entering and exiting

$(function() {
    var logThis = function(e) {
        pushSectionViewed(this, e.type);
    }

   $("H1").bind('enterviewport', logThis);
//   $("H1").bind('leaveviewport', logThis);
   $("H1").bullseye();
   $("H2").bind('enterviewport', logThis);
//   $("H2").bind('leaveviewport', logThis);
   $("H2").bullseye();
   $("H3").bind('enterviewport', logThis);
//   $("H3").bind('leaveviewport', logThis);
   $("H3").bullseye();

//  login
   $(document).ready(function() {
        resolveUserEid('handleUserLoginCheck');
   });
   $('#loginLink').hover(function() {
        $('#loginBox').slideDown(1000);
        return true;
    });
    $('#loginLink').mouseout(function() {
        setTimeout("$('#loginBox').slideUp(10000)",2500);
        return true;
    });
});

function handleUserLoginCheck(_userEid) {
    if (_userEid) {
        $('#loginBox').hide();
    } else {
        $('#loginBox').show();
        setTimeout("$('#loginBox').slideUp(10000)",2500);
    }
    return true;
}

// ########################  START Onsophic ##################################

//ssanders: BEGIN: Added
var jsonRequestQueue = [];
var jsonRequestTime = new Date().getTime();
var jsonRequestBusy = false;
var jsonRequestUrl = 'http://www.willthatbeonthefinal.com:8088/direct/';

function resolveUserEid(_callbackName) {
/* REMOVED PBS 1/12/2013
    var userUrl = jsonRequestUrl + 'learnrepoActivityEvent/resolveUserEid.json';
    var userRequestId = '_userRequest';
    var userRequestElement = document.getElementById(userRequestId);
    if (userRequestElement) {
        userRequestElement.parentNode.removeChild(userRequestElement);
    }
    userRequestElement = document.createElement('SCRIPT');
    userRequestElement.type = 'text/javascript';
    userRequestElement.id = userRequestId;
    //ssanders: Defeat caching of JavaScript
    userRequestElement.src = userUrl + '?jsonRequestCallback=' + _callbackName + '&jsonRequestTime=' + jsonRequestTime++;
    document.body.appendChild(userRequestElement);
*/
}

function performJsonRequest(_url) {
/* REMOVED PBS 11/2/2012
    jsonRequestBusy = true;
    var jsonRequestId = '_jsonRequest';
    var jsonRequestElement = document.getElementById(jsonRequestId);
    if (jsonRequestElement) {
        jsonRequestElement.parentNode.removeChild(jsonRequestElement);
    }
    jsonRequestElement = document.createElement('SCRIPT');
    jsonRequestElement.type = 'text/javascript';
    jsonRequestElement.id = jsonRequestId;
    //ssanders: Ensure callback and defeat caching of JavaScript
    jsonRequestElement.src = _url + '&jsonRequestCallback=callbackJsonRequest&jsonRequestTime=' + jsonRequestTime++;
    document.body.appendChild(jsonRequestElement);
*/
}

function callbackJsonRequest(_result) {
    if (console && console.log) {
        console.log('callbackJsonRequest(' + _result + ')');
    }
    if (jsonRequestQueue.length > 0) {
        performJsonRequest(jsonRequestQueue.shift());
    } else {
        jsonRequestBusy = false;
    }
}

function enqueueJsonRequest(_url) {
    if (console && console.log) {
        console.log('enqueueJsonRequest(' + _url + '): jsonRequestBusy=' + jsonRequestBusy);
    }
/*  REMOVED PBS 11/2/2012
    if (jsonRequestBusy) {
        jsonRequestQueue.push(_url);
    } else {
        performJsonRequest(_url);
    }
*/
}

//  set maximum wait for json callback
  var jsonMaxIterationCount = 200;

function waitForJsonRequest(_callback) {
/* Removed by PBS.  Needs testing when analytics are restored
     var that = this;
     var jsonIterationCount = 0;
     var cb = _callback;
     function jsonRequestWait() {
         if ((jsonRequestBusy || jsonRequestQueue.length > 0) &&
            jsonIterationCount < jsonMaxIterationCount ) {
               jsonIterationCount += 1;
               setTimeout(jsonRequestWait, 100);
         } else {
             if (cb) {
                  cb();
             }
         }
     }
     setTimeout(jonRequestWait, 100);
     return that;
*/
     jsonIterationCount = 0;
     if (_callback) {
        _callback();
     }
     console.log('waitForJsonRequest: done.');
     return true;
}

function resolveAddOrUpdateUrl(_eventType) {
    var addOrUpdateUrl = jsonRequestUrl + 'learnrepoActivityEvent/addOrUpdate.json';
    addOrUpdateUrl += '?eventType=' + _eventType;
    var targetUrl = document.location.href;
    //ssanders: Remove user/password and fragment
    targetUrl = targetUrl.replace(/:\/\/[^@]+@/, '://').replace(/#.*/, '');
    addOrUpdateUrl += '&targetUrl=' + encodeURIComponent(targetUrl);
    return addOrUpdateUrl;
}

function resolveEventParameters(_index, _anchorValue, _scorePercent, _timeMinutes) {
    var eventParameters = '';
    if (typeof _scorePercent != 'undefined' && _scorePercent != null) {
        eventParameters += '&scorePercent' + _index + '=' + _scorePercent;
    }
    if (typeof _timeMinutes != 'undefined' && _timeMinutes != null) {
        eventParameters += '&timeMinutes' + _index + '=' + _timeMinutes;
    }
    if (typeof _anchorValue != 'undefined' && _anchorValue != null) {
        eventParameters += '&anchorValue' + _index + '=' + encodeURIComponent(_anchorValue);
    }
    return eventParameters;
}

function pushActivityEvent(_eventType, _anchorValue, _scorePercent, _timeMinutes) {
    var pushUrl = resolveAddOrUpdateUrl(_eventType);
    pushUrl += resolveEventParameters('', _anchorValue, _scorePercent, _timeMinutes);
    if (console && console.log) {
        console.log('pushActivityEvent(' + _eventType + ', ' + _anchorValue + ', ' +
            _scorePercent + ', ' + _timeMinutes + ')');
    }
    enqueueJsonRequest(pushUrl);
}

function pushActivityEventSet(_eventType, _anchorValuesAndScorePercents) {
    var pushUrlPrefix = resolveAddOrUpdateUrl(_eventType);
    var pushUrl = '';
    var cnt = 1;
    var scorePercent;
    var anchorValue;
    for (anchorValue in _anchorValuesAndScorePercents) {
      scorePercent = _anchorValuesAndScorePercents[anchorValue];
      pushUrl += resolveEventParameters(cnt, anchorValue, scorePercent);
      if (console && console.log) {
          console.log('pushActivityEventSet(' + cnt + ', ' + _eventType + ', ' +
              anchorValue + ', ' + scorePercent + ')');
      }
      cnt+=1;
      //ssanders: Ensure shorter than max URL length
      if (pushUrl.length > 2048 - pushUrlPrefix.length - 128) {
        enqueueJsonRequest(pushUrlPrefix + pushUrl);
        pushUrl = '';
        cnt = 1;
      }
    }
    if (pushUrl.length > 0) {
      enqueueJsonRequest(pushUrlPrefix + pushUrl);
    }
}

function pushSectionViewed(_heading, _eventType) {
    var parentSibling = _heading.firstChild
    var anchorValue;
    while (parentSibling) {
        if (parentSibling.id) {
           anchorValue = "//" + parentSibling.nodeName +
                  "[@id='" + parentSibling.id + "']";
           break;
        }
        parentSibling = parentSibling.nextSibling ? parentSibling.nextSibling :  null;
    }
    if (anchorValue) {
       pushActivityEvent('WORKED', anchorValue);
    }
}


function pushQuestionsWorked(_questionsAndAnswers) {
	var anchorValuesAndScorePercents = [];
	var truth;
	var questionNumber;
	var cnt;
	for (questionNumber in _questionsAndAnswers) {
		truth = _questionsAndAnswers[questionNumber];
	    var anchorValue = 'Q' + questionNumber;
    	    var questionInput = $(anchorValue);
	    if (!questionInput) {
    	    for (cnt = 0; cnt < frames.length; cnt+=1) {
        	    try {
            	        questionInput = frames[cnt].document.getElementById(anchorValue);
                	if (questionInput) {
	                    break;
    	                }
        	     } catch (e) {
            	      //ssanders: Frame is not accessible, because it's from another domain
	             }
    	    }
	    }
    	if (questionInput) {
	        //ssanders: Try to build XPath based on Exercise and Question Ids
    	        var parentSibling = questionInput.parentNode;
        	while (parentSibling) {
            	    if (parentSibling.id) {
	                anchorValue = "//" + parentSibling.nodeName +
    	                      "[@id='" + parentSibling.id + "']/following::" +
        	              questionInput.nodeName + "[@id='" + questionInput.id + "']";
            	        break;
	             }
    	             parentSibling = parentSibling.previousSibling ? parentSibling.previousSibling :  parentSibling.parentNode;
        	}
	 }
    	 anchorValuesAndScorePercents[anchorValue] = truth ? 100 : 0;
    }
    pushActivityEventSet('WORKED', anchorValuesAndScorePercents);
}

function pushSolutionOpened(_questionNumber) {
    var anchorValue = 'solDivLink' + _questionNumber;
    var solutionLink = $(anchorValue);
    var cnt;
    if (!solutionLink) {
        for (cnt = 0; cnt < frames.length; cnt+=1) {
            try {
                solutionLink = frames[cnt].document.getElementById(anchorValue);
                if (solutionLink) {
                    break;
                }
            } catch (e) {
                //ssanders: Frame is not accessible, because it's from another domain
            }
        }
    }
    if (solutionLink) {
        //ssanders: Try to build XPath based on Exercise and Question Ids
        var parentSibling = solutionLink.previousSibling;
        while (parentSibling) {
            if (parentSibling.id) {
              anchorValue = "//" + parentSibling.nodeName +
                  "[@id='" + parentSibling.id + "']/following::" +
                  solutionLink.nodeName + "[@id='" + solutionLink.id + "']";
              break;
            }
            parentSibling = parentSibling.previousSibling ? parentSibling.previousSibling :  parentSibling.parentNode;
        }
    }
    pushActivityEvent('OPENED', anchorValue);
}

function pushFootnoteOpened(_footnoteNumber) {
    var anchorValue = "//SPAN[@id='fnSpanLink" + _footnoteNumber + "']";
    pushActivityEvent('OPENED', anchorValue);
}


var assignmentOpenedTime;
function pushAssignmentOpened() {
    pushActivityEvent('OPENED');
    assignmentOpenedTime = new Date();
}

function pushAssignmentClosed(_scorePercent, _timeMinutes) {
    if (!_timeMinutes && assignmentOpenedTime) {
        _timeMinutes = (new Date() - assignmentOpenedTime) / 1000 / 60;
    }
    pushActivityEvent('CLOSED', null, _scorePercent, _timeMinutes);
}
//ssanders: END: Added

// ########################  END Onsophic ##################################


function checkAnswer(number, response) {
  // check response against key[number-1].  If number is not an integer,
  // calls findNum(number) to remove characters to try to leave an integer.
    var theQuestion = findNum(number);
    var truth = scoreProblem(crypt(key[theQuestion-1],randSeed.toString()),response);
    if (truth) {
        document.images[boxList[theQuestion-1]].src = rightImgSrc;
        document.images[boxList[theQuestion-1]].alt = "Correct!";
    } else {
        document.images[boxList[theQuestion-1]].src = wrongImgSrc;
        document.images[boxList[theQuestion-1]].alt = "Sorry, wrong answer!";
    }
    var questionsAndAnswers = [];
    questionsAndAnswers[theQuestion] = truth;
    pushQuestionsWorked(questionsAndAnswers); //* Onsophic
    return truth;
}

function isAnswered(qVal) { // checks whether the student answered a question
    var n = findNum(qVal) - 1;
    var iA = false;
    var inx;
    var i;
    var el = document.forms[0].elements[qVal];
    var qT = el.type;
    if (qT == 'select-one') {
        inx = el.selectedIndex;
        if (inx > 0) {
            iA = true;
        }
    } else if (qT == 'select-multiple') {
        resp = parseMultiple(el.id);
        if (resp != null && resp != '' && resp != '?') {
            iA = true;
        }
    } else if (qT == 'text' || qT == 'textarea') {
        resp = el.value;
       if (resp != null && resp != '' && removeAllBlanks(resp) != null &&
                 removeAllBlanks(resp).length > 0) {
            iA = true;
        }
    } else if (qT == 'radio') { // incomprehensible bugs with this
        iA = parseRadio(el.class);
    } else if ( typeof(qT) == 'undefined' || qT == null ) { // assume it is a radio
        for (i=0; i < el.length; i+=1) {
            if (el[i].checked) {
                iA = true;
            }
        }
    } else {
        alert('Error #1 in irGrade.js.isAnswered(): input type ' + qT +
           ' is not supported!');
    }
    return iA;
}


function giveAnswer(number) {
 // display the answer to question[number] in a visibility-controlled div, provided the student has
 // tried to answer the question; else display a warning
    ansText = parseKey(crypt(key[findNum(number)-1], randSeed.toString()))[2];
    var q = findNum(number);
    var ansSpan = $('#ansSpan' + q.toString());
    if ($(ansSpan).css('display') == 'block') {  // hide the answer
           $(ansSpan).css('display','none')
                     .html('');
    } else {                                         // show the answer, or a warning if response is blank
       var qStr = '<p>[<a onClick = "$(\'#ansSpan' + q.toString() + '\').css(\'display\',\'none\');">-</a>]';
       if (isAnswered(number)) {
           qStr += '<span class="correctSpan">Answer: ' + ansText + '</span>.';
       } else {
           qStr += '<span class="warnSpan">You must answer before you may see the solution.</span>';
       }
       qStr += '</p>';
       $(ansSpan).html(qStr)
                 .css('display','block');
    }
    return true;
}

function validEmail(e) { // checks whether e appears to be a valid email address
    var okEmailChars="._-@:%0123456789abcdefghijklmnopqrstuvwxyz";
    var truth = true;
    var i;
    if (e == null || e.length == 0) {
        truth=false;
    } else {
        et = trimToLowerCase(e);
        if (et.indexOf('@') == -1 ||
            ( (et.lastIndexOf('.') != et.length - 4 ) &&
              (et.lastIndexOf('.') != et.length - 3 ) ) )
            truth = false;
        else if (et.indexOf('@') != et.lastIndexOf('@')) {
            truth = false;
        } else {
            for (i=0; i < et.length; i+=1) {
                if(okEmailChars.indexOf(et.charAt(i)) < 0) {truth = false;}
            }
        }
    }
    return truth;
}

function validSID(s){ // check whether SID is valid
/* REMOVED PBS 11/7/2012
    var digits="0123456789";
    var truth = false;
    if (s.length == 8 && (s.charAt(0) == "1" || s.charAt(0) == "2") || s.length == 9) {
        truth = true;
        if (s.match(/[^1234567890]/)) {
             truth = false;
        }
    }
    return truth;
*/
    return true;
}

function validateLabletSubmit(theForm){
// check that various form entries are filled in correctly, submit or cancel
    if (validateLablet(theForm)){
        return labletSubmit(theForm);
    } else {
        return false;
    }
}

function labletSubmit(theForm) {
     var OK = false;
     confirmStr = 'Your assignment is ready to submit. \nPress "OK" to submit it, or "Cancel" to return to the assignment.';
     if (confirm(confirmStr)) {
         setExtraInputs(theForm);
         pushAssignmentClosed(theForm.elements['score'].value);
         jsonIterationCount = 0;
         waitForJsonRequest(function() {    // wait, because submit() replaces the DOM/JS
             setSubmitCookie(setNum.toString(),theForm,false);
             document.forms[1].action = graderActionURL;
             var s = collectResponses(theForm,true,true);
             document.forms[1].elements['contents'].value = crypt(s,bigPi);
             document.forms[1].submit();
         });
         OK = true;
     } else {
        alert('Your assignment has NOT been submitted.');
        OK = false;
     }
     return OK;
}

function validateLablet(theForm) {
    if (theForm.firstName.value == null ||
          theForm.firstName.value.length == 0 || allBlanks(theForm.firstName.value)) {
        alert('First Name is missing');
        theForm.firstName.focus();
        return false;
    } else if (theForm.lastName.value == null || theForm.lastName.value.length == 0 ||
             allBlanks(theForm.lastName.value) ) {
        alert('Last Name is missing');
        theForm.lastName.focus();
        return false;
    } else if ( !validEmail(theForm.email.value)) {
        alert('Email address is missing or invalid');
        theForm.email.focus();
        return false;
    }
    var OK = false;
    if (enrollList.indexOf(CryptoJS.SHA256(trimToLowerCase(theForm.sid.value) + ',' +
                trimToLowerCase(theForm.email.value)).toString()) > -1) {
          OK = true;
          theForm.lastName.value = trimBlanks(theForm.lastName.value);
          theForm.firstName.value = trimBlanks(theForm.firstName.value);
          theForm.email.value = trimToLowerCase(theForm.email.value);
          theForm.sid.value = trimBlanks(theForm.sid.value);
    } else {
          alert('You do not seem to be enrolled; please check that you entered your ID and email ' +
                'address correctly and that this page is the correct assignment page for the class ' +
                'you are enrolled in.');
    }
    return OK;
}

function saveResponses(setName,theForm,saveAns) {
    if(setSubmitCookie(setName,theForm,false)) {
        confirm('Your answers have been saved as a cookie on your computer.\n' +
               'Cookies are NOT RELIABLE storage--do not count on them!\n' +
               'You should write your answers down, too.\n' +
               'The cookie will be erased automatically in ' +
               cookieExpireDays.toString() + ' days or less.');
        return true;
    } else {
        alert('Error #1 in irGrade.saveResponses:\nYour answers might NOT have been saved,\n' +
                'or previous answers might have been deleted, because the cookie became too large.');
        return false;
    }
}

function setSubmitCookie(fff,theForm,idInfo){
    var ok = true;
    var s = collectResponses(theForm,false,idInfo);
    document.cookie = crypt(fff + theForm.sid.value, theForm.sid.value) +
                       '=' + crypt(s, theForm.sid.value) + ';EXPIRES=' + expireTimeString();
    if (document.cookie.length > 2048) {
         deleteAllCookies();
         document.cookie = crypt(fff + theForm.sid.value, theForm.sid.value) +
                            '=' + crypt(s, theForm.sid.value) + ';EXPIRES=' + expireTimeString();
         ok = false;
    }
    return ok;
}

function recoverResponses() {
    if (continueLab == null) {
        return false;
    } else {
        var theSid = getCookieVal(continueLab,"sid");
        var thePw = theSid;
        var tv = false;
        var theForm = document.forms[0];
        var ascStr = crypt(setNum.toString() + theSid, thePw)+ '=';
        var searchStr = document.cookie;
        var startInx = searchStr.indexOf(ascStr);
        if (startInx < 0 ) {
            return false;
        }
        searchStr = searchStr.substring(startInx+ascStr.length,searchStr.length);
        var endInx = searchStr.indexOf(';');
        if (endInx > -1 ) {
            searchStr = searchStr.substring(0,endInx);
        }
        searchStr = crypt(searchStr,thePw) + "&";
        var qName;
        var aText;
        var inx;
        var ampInx;
        var elem;
        var i;
        var j;
        for (i=0; i < theForm.elements.length; i+=1) {
            qName = theForm.elements[i].id + '=';
            if (qName.indexOf('Q') == 0) {
                elem = theForm.elements[i];
                if (elem.type == 'select-multiple') {
                    while (searchStr.indexOf(qName) > -1) {
                           inx = searchStr.indexOf(qName);
                           searchStr = searchStr.substring(inx+qName.length,searchStr.length);
                           ampInx = searchStr.indexOf('&');
                           qText = unescape(searchStr.substring(0,ampInx));
                           // search for option to select
                           var ag = false;
                           for (j=0; j < elem.length; j+=1) {
                                if (elem[j].value == qText) {
                                    elem.options[j].selected = true;
                                    ag = true;
                                }
                           }
                    }
                } else if (elem.type == 'select-one') {
                       inx = searchStr.indexOf(qName);
                       if (inx > -1){
                           searchStr = searchStr.substring(inx+qName.length,searchStr.length);
                           ampInx = searchStr.indexOf('&');
                           qText = unescape(searchStr.substring(0,ampInx));
                           // search for option to select
                           for (j=0; j < elem.length; j+=1) {
                             if (elem[j].value == qText) {
                                elem.options[j].selected = true;
                             }
                           }
                    }
                } else if (elem.type == 'text' || elem.type == 'textarea') {
                       inx = searchStr.indexOf(qName);
                       if (inx > -1) {
                           searchStr = searchStr.substring(
                                inx+qName.length,searchStr.length);
                           ampInx = searchStr.indexOf('&');
                           qText = unescape(searchStr.substring(0,ampInx));
                           elem.value = qText;
                       }
                } else if (elem.type == null || elem.type == 'radio' ||
                           elem.type == 'undefined') {
                    inx = searchStr.indexOf(qName);
                       if (inx > -1){
                           searchStr = searchStr.substring(inx+qName.length,searchStr.length);
                           ampInx = searchStr.indexOf('&');
                           qText = unescape(searchStr.substring(0,ampInx));
                           if (elem.value == qText) {
                                elem.checked = true;
                           }
                       }
                } else {
                    alert('Error #1 in irGrade.recoverResponses(): unsupported problem type ' +
                        elem.type + '!');
                    return false;
                }
            }
        }
    }
    return true;
}

function collectResponses(theForm,saveAs,saveId) {
    var typ;
    var nam;
    var s = '';
    var i;
    var j;
    s += 'randSeed=' + escape(randSeed) + '&';
    for (i=0; i < theForm.elements.length; i+=1) {
        typ = theForm.elements[i].type;
        nam = theForm.elements[i].id;
        if (typ == "button" || typ == "submit" || typ == "reset") {
        } else if (!saveId && (nam == "lastName" || nam == "firstName" ||
                             nam == "sid" || nam == "sid2" || nam == "email" ||
                             nam == "passwd" || nam == "passwd2")) {
        } else if (typ == "select-one") {
            s += escape(nam) + '=' +
                 escape(theForm.elements[i].options[
                   theForm.elements[i].options.selectedIndex].value)+ '&';
        } else if (typ == "select-multiple") {
            for (j=0; j < theForm.elements[i].options.length; j+=1) {
                if (theForm.elements[i].options[j].selected) {
                    s += escape(nam) + '=' +
                        escape(theForm.elements[i].options[j].value) + '&';
                }
            }
        } else if (typ == "radio") {
            if (theForm.elements[i].checked) {
                s += escape(nam) + '=' +
                    escape(theForm.elements[i].value) + '&';
            }
        } else {
            s += escape(nam) + '=' + escape(trimBlanks(theForm.elements[i].value)) + '&';
        }
    }
    if (saveAs) {
        for (i=0; i < key.length; i+=1) {
            s += escape('a' + (i+1).toString()) + '=' + escape(crypt(key[i],randSeed.toString()).toString()) + '&';
        }
    }
    if (s[s.length-1] == "&") {
        s = s.substring(0,s.length - 1);
    }
    return s;
}

function labInstrSetUp(seed,sn) {
    isLab = false;
    dfStat = 'Tools for SticiGui Assignment ' + sn.toString();
    sectionContext = '';
    window.id= 'setj';
    setNum = sn;
    cNum = assignmentPrefix + setNum;
    HI = true;
    writeProblemSetHead(setNum);
    return true;
}

function labSetUp(seed, sn) {
    isLab = true;
    dfStat = 'SticiGui Assignment ' + sn.toString();
    sectionContext = '';
    window.id= 'seti';
    setNum = sn;
    cNum = assignmentPrefix + setNum;
    HI = true;
    if (typeof(parent.sAns) == 'undefined') {
        CA = 'invalid';
    } else {
        CA = parent.sAns;
    }
    if (seed != "SeEd") {
        rand = new rng(parseInt(seed));
    } else {
        continueLab = parent.continueLab;
        if (continueLab == null || CA == 'invalid') {
            alert('Error #1 in irGrade.labSetUp()!\n' +
                'Assignment not initialized correctly.\n' +
                'You must use the Assignment Form to go to this page.\n' +
                'If you did, make sure your browser is configured to accept cookies, ' +
                ' and try again.\n ');
            document.close();
            window.close();
            parent.close();
            return false;
        } else {
            var searchStr = continueLab + '&';
            var pat = "randSeed=";
            var inx = searchStr.indexOf(pat);
            if (inx < 0) {
                alert('Error #2 in irGrade.labSetUp()!\n' +
                    'Assignment not recovered correctly.\n' +
                    'Questions may have changed!');
                rand = new rng();
            } else {
                searchStr = searchStr.substring(
                    inx + pat.length, searchStr.length);
                randSeed = unescape(searchStr.substring(0,searchStr.indexOf('&')));
                rand = new rng(randSeed);
            }
        }
    }
    randSeed = rand.getSeed();
    writeProblemSetHead(setNum);
    return true;
}

function setRequiredInputs(theForm) {
    theForm.elements['lastName'].value =  getCookieVal(continueLab,"lastName");
    theForm.elements['firstName'].value = getCookieVal(continueLab,"firstName");
    theForm.elements['email'].value = getCookieVal(continueLab,"email");
    theForm.elements['sid'].value = getCookieVal(continueLab,"sid");
    theForm.elements['sid2'].value = getCookieVal(continueLab,"sid");
    theForm.elements['passwd'].value = getCookieVal(continueLab,"sid");
    theForm.elements['passwd2'].value = getCookieVal(continueLab,"sid");
    return true;
}

function setExtraInputs(theForm) {
    var i;
    theForm.elements['inlinekey'].value = inlinePrefix + (qCtr-1).toString();
    theForm.elements['dFile'].value = parent.dFile;
    theForm.elements['teacher'].value = parent.teacher;
    theForm.elements['class'].value = parent.course;
    theForm.elements['maxSubmits'].value = parent.maxSubmits;
    theForm.elements['showWrongAfterSubmits'].value = parent.showWrongAfterSubmits;
    theForm.elements['extrainfo'].value = escape('seed=' + randSeed.toString() +
                             '&irGradeVersion=' + irGradeModTime.toString() +
                             '&submitTime=' + (new Date()).toString() +
                             '&assignmentname=' + parent.assignmentname
                          );
    var nRight = 0;
    var qVal;
    var resp;
    var qType;
    var questionsAndAnswers = [];
    for (i=1; i < qCtr; i+=1) {
        qVal = $('#Q' + i.toString());
        try {
              qType = qVal.attr('type'); // theForm.elements[qVal].type;
              if (qType == 'select-one') {
                  resp = qVal.filter(':selected').val();
              } else if (qType == 'select-multiple') {
                  resp = parseMultiple('Q' + i.toString);
              } else if (qType == 'text' || qType == 'textarea') {
                  resp = qVal.val();
              } else if (qType == 'radio') {
                  resp = parseRadio(theForm.elements[qVal].class);
              } else if (qType == null || qType == 'undefined') { // radio too!
                  if (theForm.elements[qVal].checked) {
                      resp = theForm.elements[qVal].value;
                  }
              } else {
                  alert('Error #1 in irGrade.setExtraInputs(): Input type ' + qType +
                     ' in question ' + qVal + ' is not supported!');
              }
              var sp = scoreProblem(crypt(key[i-1], randSeed.toString()), resp);
              if (sp) {
                    nRight+=1;
              }
              questionsAndAnswers[i] = sp;
        } catch(e) {
              console.log('Error in irGrade.setExtraInputs() for Q ' + i + ': ' + e);
        }
    }
    pushQuestionsWorked(questionsAndAnswers); // Onsophic
    theForm.elements['score'].value = roundToDig(100*nRight/(qCtr - 1),2).toString();
    return true;
}


// ============================================================================
// ============================ SPECIAL HTML GENERATORS =======================

function styleSheetRef(relPath) {
    if (typeof(relPath) == 'undefined' || relPath == null || relPath.length == 0) {
    	relPath = '..';
    }
    return '<link rel="stylesheet" type="text/css" href="' + relPath + cssBase.toString() + '" />';
}

function writeChapterHead(seed, chTit, titStr, showSticiGui, relPath) {
    theChapter = null;
    showQMarks = false;
    if (typeof(showSticiGui) == 'undefined' || showSticiGui == null) {
            showSticiGui = true;
    }
    var noTitStr = false;
    if (typeof(titStr) == 'undefined' || titStr == null || titStr.length == 0) {
            noTitStr = true;
    }
    if (typeof(relPath) == 'undefined' || relPath == null || relPath.length == 0) {
    	relPath = '..';
    }
    if (typeof(chTit) == 'undefined' || chTit == null || chTit.length == 0) {
    	theChapter = null;
    } else {
	    theChapter = chapterNumbers[chTit];
    }
    if (theChapter == null) {
        if (noTitStr) {
                alert('Error in irGrade.writeChapterHead(): chapter ' + chTit +
                      ' is not in the index!');
        }
    }
    if (seed != "SeEd") {
        rand = new rng(parseInt(seed));
    } else {
        rand = new rng();
    }
    randSeed = rand.getSeed();
    window.id = 'bookWin';
    if (noTitStr) {
        theChapterTitle = chapterTitles[theChapter][0];
    } else {
        theChapterTitle = titStr;
    }
    if (showSticiGui) {
            dfStat = 'SticiGui ' + removeMarkup(theChapterTitle);
    } else {
            dfStat = theChapterTitle;
    }
    var qStr =  metaTagXHT + styleSheetRef(relPath) +
                   '<title>' + dfStat + '</title>' +
                   '<base target="glossWin">';
    document.writeln(qStr);
    CA = (1==1);
    HI = false;
    randSeed = rand.getSeed();
    sectionContext = '';
    return true;
}

function writeChapterNav(relPath) {
    if (typeof(relPath) == 'undefined' || relPath == null || relPath.length == 0) {
    	relPath = '..';
    }
    var qStr =
              /* REMOVED PBS 11/2/2012
                '<div class="loginStub" id="loginStub"><a id="loginLink" href="http://www.willthatbeonthefinal.com:8088/portal" target="_self">' +
                '&laquo;login</a></div>' +
                '<div class="loginBox" id="loginBox">If you are enrolled in a course using these materials, please ' +
                '<a href="http://www.willthatbeonthefinal.com:8088/portal" target="_self">log into the class portal</a>.</div>' +
              */
                '<div id="divNav"><ul id="navMenu" class="compact"><li><a href="#firstContent" ' +
                'title="skip navigation" target="_self">Menu&nbsp;&raquo;</a>' +
		'<ul>' +
                '<li><a href="' + relPath + '/index.htm" title="SticiGui Homepage" target="_top">Home</a></li>' +
                '<li><a href="' + relPath + '/Text/index.htm" title="SticiGui Text Table of Contents" ' +
                   'target="_top">Text Table of Contents</a></li>' +
                '<li><a href="http://www.youtube.com/course?list=PL10921DED3A8BFF53" ' +
                   'target="_new" title="Online Lectures">Online Lectures</a></li>' +
                '<li><a href="' + relPath + '/Problems/index.htm" title="Online Assignments" ' +
                   'target="_top">Assignments</a></li>' +
                '<li><a href="javascript:void(0)" title="calculator applet" onClick="calcWin = ' +
                   'window.open(\''
                             + relPath + '/../Java/Html/SimpleStatCalc.htm\',\'calcWin\',' +
                   '\'toolbar=no,location=no,directories=no,status=no,' +
                   'scrollbars=yes,resizable=yes,width=320,height=200,top=0,left=0\');"> ' +
                   'Calculator</a></li>' +
                '<li><a href="' + relPath + '/../Java/Html/index.htm" title="Java Tools and Demos" ' +
                   'target="_self">Tools &amp; Demos&nbsp;&raquo;</a>' +
                     '<ul>' +
    			  '<li><a href="' + relPath + '/../Java/Html/BinHist.htm" target="lablet">Binomial Histogram</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/SimpleStatCalc.htm" target="lablet">Calculator</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/chiHiLite.htm" target="lablet">Chi-square distribution</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/HistControl.htm" target="lablet">Controlling for variables</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/Ci.htm" target="lablet">Confidence Intervals</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/Correlation.htm" target="lablet">Correlation and Regression</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/HistHiLite.htm" target="lablet">Histogram</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/lln.htm" target="lablet">Law of Large Numbers</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/NormApprox.htm" target="lablet">Normal Approximation to Data</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/StandardNormal.htm" target="lablet">Normal Curve</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/NormHiLite.htm" target="lablet">Normal Probabilities</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/ProbCalc.htm" target="lablet">Probability Calculator</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/SampleDist.htm" target="lablet">Sampling Distributions</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/ScatterPlot.htm" target="lablet">Scatterplots</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/tHiLite.htm" target="lablet">Student\'s t Distribution</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/Venn.htm" target="lablet">Venn Diagram (2 subsets)</a></li>' +
                          '<li><a href="' + relPath + '/../Java/Html/Venn3.htm" target="lablet">Venn Diagram (3 subsets)</a></li>' +
                       '</ul>' +
                '</li>' +
                '<li><a href="' + relPath + '/Review/index.htm" title="Exam Review Materials" ' +
                   'target="_self">Review</a></li>' +
                '<li><a href="' + relPath + '/Text/gloss.htm" title="SticiGui Statistics Glossary" ' +
                   'target="_new">Glossary</a></li>' +
                '<li><a href="' + relPath + '/Text/references.htm" title="SticiGui Bibliography" ' +
                   'target="_self">Bibliography</a></li>' +
                '<li><a href="' + relPath + '/minimum.htm" title="SticiGui Minimum System Requirements" ' +
                   'target="_self">System Requirements</a></li>' +
                '<li><a href="' + relPath + '/../index.html" title="Author\'s Homepage" ' +
                   'target="_new">Author\'s Homepage</a></li>' +
                '</ul></li></ul></div>';
    document.writeln(qStr);
    if (window.attachEvent) {
         window.attachEvent("onload", sfHover);
    }
}

function sfHover() {
    var i;
	var sfEls = document.getElementById("navMenu").getElementsByTagName("LI");
	for (i=0; i<sfEls.length; i+=1) {
		sfEls[i].onmouseover=function() {
			this.className+= " sfhover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
		}
	}
        return true;
}


function writeChapterTitle(s) {
    qStr = '<h1><a id="firstContent"></a>';
    if (typeof(s) != 'undefined' && s != null && s != '') {
         qStr += s;
    } else if (typeof(theChapter) != 'undefined' && theChapter != null) {
         qStr += 'Chapter ' + theChapter.toString();
    } else {
         qStr += 'SticiGui';
    }
    qStr +=  '</h1>';
    document.writeln(qStr);
    return true;
}

function examSetUp(seed, sName, sn) {
    isLab = false;
    showQMarks = false;
    sectionContext = '';
    window.id= 'seti';
    examName = sName;
    examNum = sn;
    cNum = sn;
    HI = true;
    if (seed != "SeEd") {
        rand = new rng(parseInt(seed));
    } else {
        rand = new rng();
    }
    randSeed = rand.getSeed();
    writeExamHeader(examName, examNum.toString() + '.' + randSeed.toString() );
    dfStat = 'SticiGui ' + examName + ' ' + examNum.toString();
    return true;
}

function writeExamHeader(exNam, exVer, relPath) {
    if (typeof(relPath) == 'undefined' || relPath == null || relPath.length == 0) {
    	relPath = '..';
    }
    var qStr =  metaTagXHT + styleSheetRef(relPath) +
                   '<title>' + dfStat + '</title>' +
                   '<base target="glossWin">' +
                   '<form id="labletForm" method="POST" accept-charset="UTF-8"><h1><a id="firstContent"></a>' +
                   '<a href="../index.htm" target="_new">SticiGui</a> ' + exNam +
                   '</h1><h2> Version ' + exVer.toString() + '</h2>';
    document.writeln(qStr);
    return true;
}

$(document).ready(function() {
    try{
       eval(sectionContext);
    } catch(e) {
    }
    if (  (typeof(document.forms) != 'undefined') && (document.forms != null) &&
            (document.forms.length > 0 ) && !isLab )  {
        document.forms[0].reset();
    }
    if (isLab) {
        recoverResponses();
    }
    try {
         $('#chLink' + theChapter.toString()).css('color','#ffffff')
                                             .css('backgroundColor','#000000');
    } catch(e) {}
    $("div.solution").css('display','block')
                     .hide();
    $(".solLink").click(function() {
                //      $(this).parent().next().toggle();
                      $("*").eq($("*").index(this)+1).toggle();
                      $(this).text( ($(this).text() == '[+Solution]') ? '[-Solution]' : '[+Solution]');
               //       pushSolutionOpened($(this));  // for analytics
                      return false;
    });
    $(".footnote").css('display','block')
                  .hide();
    $(".fnLink").click(function() {
                      $("*").eq($("*").index(this)+1).toggle();
                      $(this).text( ($(this).text() == '[+]') ? '[-]' : '[+]');
               //       pushFootnoteOpened($(this));  // for analytics
                      return false;
                })
                .css('vertical-align','super');
});


function writeProblemSetFooter() {
    var qStr = '<div align="center"><center>';
    if (parent.allowSubmit) {
        qStr += '<input type="button" id="subBut" value="Submit for Grading" ' +
                   ' onClick="labletSubmit(this.form);" />' +
                '<input type="button" id="saveBut" value="Save Answers" ' +
                   ' onClick="saveResponses(setNum.toString(),this.form,false)" />';
    } else {
        qStr += '<input type="reset" id="reset" value="Clear Form" />';
    }
    qStr += '</center></div><p>&nbsp;</p></form>' +
            '<form method="POST" accept-charset="UTF-8">' + hiddenInput('contents',' '); + '</form>';
    document.writeln(qStr);
    writeMiscFooter(false);
    return true;
}

function writeSolution(p,text,solFunc) {
    var qStr = '<div class="solutionLink"><p><a href="#" class="solLink">[+Solution]</a></p> ' +
               '<div class="solution">';
    if (typeof(text) != 'undefined') {
       qStr += text;
    }
    qStr += '</div></div>';
    document.writeln(qStr);
    return true;
}

function writeFootnote(p,label,text, print) {
    if (typeof(print) == 'undefined' || print == null) {
       print = true;
    }
    var chStr = '<strong>';
    if (parseInt(label) == findNum(label)) {
       if (typeof(chapterNumbers[cNum]) != 'undefined' && chapterNumbers[cNum] != null) {
        chStr += 'Note ' + (chapterNumbers[cNum]).toString() + '-';
       }
    }
    footnote = chStr + label + ':</strong> ' + text ;
    var qStr = '<a href="#" class="fnLink" id="footnote' + fCtr.toString() + '">[+]</a>' +
               '<div class="footnote"><p>' + footnote + '</p></div> ';
    if (print) {
       document.writeln(qStr);
       return true;
    } else {
       return qStr;
    }
}

function writeChapterFooter(finalCommand, relPath) {
    if (typeof(relPath) == 'undefined' || relPath == null || relPath.length == 0) {
        relPath = '..';
    }
    if (typeof(finalCommand) == 'undefined' || finalCommand == null || finalCommand.length == 0) {
        finalCommand = 'sticiBottom("' + relPath.toString() + '")';
    }
    eval(finalCommand);
    writeMiscFooter(false);
    return true;
}

function writeMiscFooter(sr) {
    var stra = '<p class="center"><a href="';
    var strb = '/index.htm" target="_top">SticiGui Home</a></p>';
    if (typeof(sr) == 'boolean') {
        if (sr) {
           document.writeln(stra + '..' + strb);
        }
    } else {
        document.writeln(stra + sr + strb);
    }
    document.write('<p><font color="#FF0000"><small>&copy;' + copyYr + pbsRef +
        '. All rights reserved.</small></font><br /><small>Last generated ' + today +
        '. ');
    if ( !(typeof(pageModDate) == 'undefined') && !(pageModDate == null) ) {
        document.write('Content last modified ' + pageModDate + '. ');
    }
    document.writeln('</small></p>');
    return true;
}

function sticiBottom(relPath) {
    var i;
    if (typeof(relPath) == 'undefined' || relPath == null || relPath.length == 0) {
    	relPath = '..';
    }
    document.writeln('<hr /><div id="chapterMenu"><p class="center">Jump to chapter:</p><p class="center">|');
    for (i=0; i< chapterTitles.length; i+=1) {
        var theChapterLinkName = chapterTitles[i][0];
        if (i > 1) {
            theChapterLinkName = i.toString();
        }
        document.writeln('<a href="' + relPath + '/Text/' + chapterTitles[i][1] + '.htm" ' +
                            'target="_self" class="pageIndex" id="chLink' + i.toString() + '">' +
                            theChapterLinkName + '</a> |');
    }
    document.writeln('</p></div>');
}

function writeProblemSetHead(sn) {
    continueLab = parent.continueLab;
    showQMarks = true;
    if (continueLab == null) {
        alert('Error #1 in irGrade.writeProblemSetHead()!\n' +
            'The assignment is not correctly initialized.\n' +
            'Make sure your browser is set up to accept cookies and try again.');
        document.close();
        window.close();
        return false;
    } else {
        theChapter = sn;
        parent.theChapter = sn;
    	var qStr = metaTagXHT + styleSheetRef('..') +
                  '<title>SticiGui Assignment ' + theChapter.toString() +
                  '</title><base target="_self">'
    	document.writeln(qStr);
    	return true;
    }
}

function writeProblemSetBody( ch, title ) {
    var theChapter = parent.theChapter;
    var assNum = ch ? ch : assignmentNumbers[theChapter];
    try {
         var qStr = '<form id="labletForm" method="POST" accept-charset="UTF-8">' +
               hiddenInput('formname', 'SticiGuiSet' + assNum ) +
               hiddenInput('lastName','') +
               hiddenInput('firstName','') +
               hiddenInput('email','') +
               hiddenInput('sid','') +
               hiddenInput('sid2','') +
               hiddenInput('passwd','') +
               hiddenInput('passwd2','') +
               hiddenInput('inlinekey','') +
               hiddenInput('dFile','') +
               hiddenInput('teacher','') +
               hiddenInput('class','') +
               hiddenInput('score','') +
               hiddenInput('maxSubmits','') +
               hiddenInput('showWrongAfterSubmits','') +
               hiddenInput('extrainfo','');
   } catch(e) {
         alert('Exception in writeProblemSetBody ' + e);
   }
    document.writeln(qStr);
    setRequiredInputs(document.forms[0]);
    title = title ? title : assignmentTitles[assignmentNumbers[theChapter]][1];
    qStr = '<h1><a id="firstContent"></a><a href="../index.htm" target="_new">SticiGui</a>: ' +
            title + '</h1>';
    document.writeln(qStr);
    pushAssignmentOpened();
    return true;
}


function makeOptions(ans, pert, dig, extra) { // make a set of numerical options as answers,
                                              // converted to strings with dig digits of
                                              // precision. each answer is perturbed by a
                                              // signed multiple of pert.
                                              // extra is appended to each answer
    var i;
    if (typeof(dig) == 'undefined' || dig == null) {
        dig = 0;
    }
    if (typeof(extra) == 'undefined' || extra == null) {
        extra = '';
    }
    var rs = listOfRandSigns(5);
    var rawOpt = new Array(5);
    for (i=0; i < 5; i+=1) {
        rawOpt[i] = commify(roundToDig(ans + i*rs[i]*pert,dig)) + extra;
    }
    var optPerm = randPermutation(rawOpt,'inverse');
    optPerm[1] = alphabet[optPerm[1][0]];
    return optPerm;
}

function makeRangeOptions(t, lo, hi, loLim, hiLim, dig, extra, iterLim) {
             // make multiple choice options
             // t is truth, lo is starting lower limit, hi is starting upper limit,
             // loLim is ultimate lower limit, hiLim is ultimate upper limit,
             // dig is digits of precision, extra is appended to each answer
             // steps up and down by 10% until t is within 0.35 of the space between
             // answers of one of the answers
    var pertFac = 0.07;      // amount by which to move endpoints each iteration
    var closeFac = 0.35;     // how much closer should answer be to one endpoint?
    var av;
    var i;
    var altern = false;      // alternate moving upper and lower endpoints
    if (typeof(extra) == 'undefined' || extra == null) {
        extra = '';
    }
    if (typeof(dig) == 'undefined' || dig == null) {
        dig = 2;
    }
    var ok = false;
    var lim = 0;
    var maxIt;
    if (typeof(iterLim) == 'undefined' || iterLim == null) {
        maxIt = maxIterations;
    } else {
        maxIt = iterLim;
    }
    while(!ok && lim <= maxIt) {
       var ans = linspace(lo,hi,5);
       var d = closeFac*(ans[1]-ans[0]);    // want to be significantly closer to one end
       if (t <= ans[0] ) {
           av = alphabet[0];
           ok = true;
       } else if ( t >= ans[4]) {
           av = alphabet[4];
           ok = true;
       } else {
           for (i=0; i < ans.length; i+=1) {
              if (Math.abs(t - ans[i]) <= d) {
                 ok = true;
                 av = alphabet[i];
              }
            }
            if (altern) {
                lo = loLim + (1.0 - pertFac)*(lo-loLim);
                altern = !altern;
            } else {
                hi = hi + pertFac*(hiLim-hi);
                altern = !altern;
            }
        }
        if (lim++ == maxIt) {
            av = alphabet[0];
            var ref = Math.abs(t-ans[0]);
            for (i=1; i < ans.length; i+=1 ) {
                var nref = Math.abs(t-ans[i]);
                if (nref < ref) {
                    ref = nref;
                    av = alphabet[i];
                }
            }
            ok = true;
            alert('Error #1 in irGrade.makeRangeOptions: maximum iterations exceeded in ' +
                  'problem ' + (pCtr-1).toString() + '.\nPlease report this to your ' +
                  'instructor.');
        }
    }
    var opt = new Array(ans.length);
    for (i=0; i < ans.length; i+=1) {
       opt[i] = commify((roundToDig(ans[i],dig)))+ extra;
    }
    var out = new Array(2);
    out[0] = opt;
    out[1] = av;
    return out;
}

function makeProbOptions(t, lo, hi, dig, iter) {
    if (typeof(dig) == 'undefined' || dig == null) {
        dig = 0;
    }
    return makeRangeOptions(100*t,100*lo,100*hi,0,100,dig,'%', iter);
}

function breakTF(groups, topt, fopt) { // randomly partition a collection of True statements
                                       // and a collection of False statements
    var g;
    var i;
    if (groups > Math.min(topt.length, fopt.length)) {
        alert('Error #1 in irGrade.breakTF(): too many groups!');
        return false;
    } else {
        var per = Math.floor((topt.length+fopt.length)/groups);
        var groupsT = constrainedRandomPartition(topt, groups, per-1);
        var fSoFar = 0;
        var broken = new Array(groups);
        var nArray = new Array(groups);
        for (g = 0; g < groups; g+=1) {
            broken[g] = [];
            nArray[g] = groupsT[g].length;
            for (i=0; i < groupsT[g].length; i+=1) {
                broken[g][i] = groupsT[g][i];
            }
            for (i = 0; i < per-groupsT[g].length; i+=1) {
                if (i+fSoFar < fopt.length) {
                    broken[g][i+groupsT[g].length] = fopt[i+fSoFar];
                }
            }
            fSoFar = fSoFar + per - groupsT[g].length;
         }
         return [broken,nArray];
    }
}


function truthTable(title, valArr) { // make a 2 by 2 truth table
    if (valArr.length < 4) {
        alert('Error #1 in irGrade.truthTable: number of truth values is ' + valArr.length);
        return null;
    } else {
        return truthTableHeader(title) +
            '<tr><td headers="col0" align="center">T</td><td headers="col1" align="center">T</td>' +
            '<td headers="col2" align="center">' + valArr[0] + '</td></tr>' +
            '<tr><td headers="col0" align="center">T</td><td headers="col1" align="center">F</td>' +
            '<td headers="col2" align="center">' + valArr[2] + '</td></tr>' +
            '<tr><td headers="col0" align="center">F</td><td headers="col1" align="center">T</td>' +
            '<td headers="col2" align="center">' + valArr[1] + '</td></tr>' +
            '<tr><td headers="col0" align="center">F</td><td headers="col1" align="center">F</td>' +
            '<td headers="col2" align="center">' + valArr[3] + '</td></tr>' +
            '</table></center></div>'
         ;
     }
}


function writeTruthTable(title, valArr) {
    document.writeln(truthTable(title, valArr));
    return true;
}

function truthTableHeader(title) {
    return  '<a id="' + title.replace(/[ &!;<>|\\\/)(]/gi,'_') + '"></a><div class="plainTable"><center><table class="truthTable">' +
            '<caption>Truth Table</caption>' +
            '<tr><th id="col0" align="center" bgcolor="lightblue"><span class="math">p</span></th>' +
            '<th id="col1" align="center" bgcolor="lightblue"><span class="math">q</span></th>' +
            '<th id="col2" align="center" bgcolor="lightblue"><span class="math">' + title +
            '</span></th></tr>'
          ;
}

function writeTruthTableProblem(title, ansArr) { // 2 by 2 truth table problem
    var opt = ['T','F'];
    var i;
    document.writeln(truthTableHeader(title));
    var solArr = new Array(ansArr.length);
    if ( (typeof(ansArr)).toLowerCase() == 'function') {
        trueArr = [true, false];
        for (i=0; i < 2; i+=1 ) {
            for (var j=0; j < 2; j+=1) {
                var inx = j + 2*i;
                if (ansArr(trueArr[j], trueArr[i])) {
                    solArr[inx] = 'a';
                } else {
                    solArr[inx] = 'b';
                }
            }
        }
    } else {
        for (i=0; i < ansArr.length; i+=1) {
            if (ansArr[i]) {
                solArr[i] = 'a';
            } else {
                solArr[i] = 'b';
            }
        }
    }
    document.writeln('<tr><td headers="col0" align="center">T</td>' +
                     '<td headers="col1" align="center">T</td><td headers="col2" align="center">');
    writeSelectExercise(false, qCtr++, opt, solArr[0]);
    document.writeln('</td></tr><tr><td headers="col0" align="center">T</td>' +
                     '<td headers="col1" align="center">F</td><td headers="col2" align="center">');
    writeSelectExercise(false, qCtr++, opt, solArr[2]);
    document.writeln('</td></tr><tr><td headers="col0" align="center">F</td>' +
                     '<td headers="col1" align="center">T</td><td headers="col2" align="center">');
    writeSelectExercise(false, qCtr++, opt, solArr[1]);
    document.writeln('</td></tr><tr><td headers="col0" align="center">F</td>' +
                     '<td headers="col1" align="center">F</td><td headers="col2" align="center">');
    writeSelectExercise(false, qCtr++, opt, solArr[3]);
    document.writeln('</td></tr></table></center></div>');
}


// ===============================================
// ===formatting functions and html generators====
// ===============================================


function commify(num) { // punctuate number strings greater than 1,000 in magnitude
    var str;
    var loc;
    var strA = (removeAllBlanks(num.toString())).toLowerCase();
    if ( (strA.indexOf('e') > -1) || (strA.indexOf('d') > -1) ) {
        str = strA;  // don't mess with exponential notation
    } else {
        str = strA;
        var curLoc = str.length;
        if ( str.indexOf('.') > -1 ) {
            curLoc = str.indexOf('.');
        }
        var negSign = str.indexOf('-');
        for (loc = curLoc-4; loc > negSign; loc -= 3) {
            str = str.substr(0,loc+1) + ',' + str.substr(loc+1, str.length);
        }
    }
    return str;
}

function commifyList(list) { // commify an array
    var j;
    var listStr = new Array(list.length);
    for (j=0; j < list.length; j+=1) {
        listStr[j] = commify(list[j]);
    }
    return listStr;
}



function writeBlankLines(k) {  // blank space
    var i;
    if ( (typeof(k) == 'undefined') || (k == null) || (k < 0) ) {
        k = 1;
    }
    for (i=0; i < k; i+=1) {
        document.writeln('<p>&nbsp;</p>');
    }
}

function roundToDig(num, dig) { // rounds a number or list to dig digits after the decimal place
    var i;
    var powOfTen = Math.pow(10,dig);
    if ((typeof(num)).toLowerCase() == 'number') {
        var fmt = Math.round(num*powOfTen)/powOfTen;
        return fmt;
    } else if ((typeof(num)).toLowerCase() == 'object' ||
               (typeof(num)).toLowerCase() == 'array') {
        var fmt = new Array(num.length);
        for (i = 0; i < num.length; i+=1) {
            fmt[i] = Math.round(num[i]*powOfTen)/powOfTen;
        }
        return fmt;
    } else {
        alert('Error #1 in irGrade.roundToDig(): argument (' + num.toString() + ') is not a number or an array');
        return Number.NaN;
    }
}

function doubleToStr(num,dig) {
  // returns a string representation of num, rounded to dig digits after the decimal
    return removeAllBlanks(roundToDig(num,dig).toString());
}

function doubleToRange(num,fudge) {
  // returns a string range of num +/- fudge, separated by a colon
    var dig = -Math.floor(Math.log(Math.abs(fudge))/Math.log(10)) + 1;
    var s = roundToDig(num,dig);
    var range = doubleToStr(s - Math.abs(fudge),dig) + ':' +
                          doubleToStr(s+ Math.abs(fudge),dig);
    range = range.replace(/ /g,'');
    return range;
}

function numToRange(num,fudge) {
  // returns a string range of num +/- fudge, separated by a colon
    if ( (typeof(fudge) == 'undefined') || (fudge == null) ) {
        fudge = fudgeFactor*num;
    }
    if (fudge == 0) {
        fudge = absFudge;
    }
    return doubleToRange(num,Math.abs(fudge));
}

function numToOrdinal(num) { // turns integer into string, appends appropriate suffix
    var st = (roundToDig(num,0)).toString();
    var suffArray = ['th','st','nd','rd','th','th','th','th','th','th'];
    var finalDig = parseInt(st.substr(st.length-1,st.length));
    var str = st;
    if (num == 11 || num == 12 || num == 13 ) {
       st = st + 'th';
    } else {
       st = st + suffArray[finalDig];
    }
    return st;
}

function listToTable(header,list,orientation,centering,print,ft) {
  // formats an array of arrays as an html table
    var i;
    var j;
    if (typeof(centering) == 'undefined' || centering == null) {
        centering = 'right';
    }
    if (typeof(print) == 'undefined') {
        print = true;
    }
    if (typeof(ft) == 'undefined' || ft == null) {
        ft = '';
        eft = '';
    } else {
        ft = '<font size="' + ft + '">';
        eft = '</font>';
    }
    var rows = list.length;
    var cols;
    if (typeof(list[0]) != 'object') {
        cols=null;
    } else {
        cols = list[0].length;
    }
    var str = '<div class="plainTable"><center><table class="dataTable">';
    if (cols == null || cols == 1) {
        str += '<tr>';
        str += '<th align="' + centering + '" id="col1"> ' + ft + header + eft + '</th>\n';
        if (orientation == 'standard') {
            for (j=0; j < rows; j+=1) {
                str +='<td align="' + centering + '" headers="col1">' +
                      ft + list[j] + eft + '</td>\n';
            }
            str += '</tr>';
        } else if (orientation == 'transpose') {
            str += '</tr>';
            for (j=0; j < rows; j+=1) {
                str += '<tr>';
                str += '<td align="' + centering + '" headers="col1">' +
                       ft + list[j] + eft + '</td>\n';
                str += '</tr>';
            }
        } else {
            alert('Error #1 in irGrade.listToTable: unsupported orientation ' + orientation);
        }
    } else {
        if (orientation == 'standard') {
            for (j = 0; j < rows; j+=1) {
                str += '<tr>';
                str += '<th align="' + centering + '" id="row' + j.toString() + '">' +
                       ft + header[j] + eft + '</th>\n';
                for (i=0; i < cols; i+=1) {
                    str += '<td align="' + centering + '" headers="row' + j.toString() + '">' +
                           ft + list[j][i] + eft + '</td>';
                }
                str +='</tr>';
            }
         } else if (orientation == 'transpose') {
            str += '<tr>';
            for (i=0; i < header.length; i+=1) {
                str += '<th align="' + centering + '" id="col' + i.toString() + '">' +
                        ft + header[i] + eft + '</th>\n';
            }
            str += '</tr>';
            for (j = 0; j < cols; j+=1) {
                str += '<tr>';
                for (i=0; i < rows; i+=1) {
                    str += '<td align="' + centering + '" headers="col' + j.toString() + '">' +
                           ft + list[i][j] + eft + '</td>\n';
                }
                str +='</tr>';
            }
         } else {
            alert('Error #2 in irGrade.listToTable: unsupported orientation ' + orientation);
         }
    }
    str += '</table></center></div>';
    if (print) {
        document.writeln(str);
        return true;
    } else {
        return str;
    }
 }

function arrayToRow(v,alignment) {
 // makes a row of a table from the elements of the array v, with specified alignment
    var i;
    document.writeln('<tr>');
    for (i=0; i < v.length; i+=1) {
        document.write('<td align="right">');
        document.write(v[i].toString());
        document.writeln('</td>');
    }
    document.writeln('</tr>');
    return true;
}

