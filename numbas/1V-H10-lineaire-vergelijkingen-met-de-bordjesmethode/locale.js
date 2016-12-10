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
R.registerLocale('nl-NL',{
	'page.loading': "Bezig met laden ...",

	'exam.exam name': "Naam toets:",
	'exam.number of questions': "Aantal vragen:",
	'exam.marks available': "Aantal punten:",
	'exam.pass percentage': "Geslaagd bij:",
	'exam.time allowed': "Beschikbare tijd:",
	'exam.passed': 'Geslaagd',
	'exam.failed': 'Niet geslaagd',
	'frontpage.start': "Start",

	'suspend.exam suspended': "De toets is onderbroken. Klik Ga door om verder te gaan.",
	'suspend.you can resume': "Volgende keer dat je de toets opstart kun je verder gaan met deze sessie.",
	'suspend.resume': "Ga door",

	'result.exit': "Exit",
	'result.review': "Review",
	'result.exam summary': "Overzicht toets",
	'result.exam start': "Start toets:",
	'result.exam stop': "Einde toets:",
	'result.time spent': "Tijd:",
	'result.questions attempted': "Aantal gemaakte vragen:",
	'result.score': "Score:",
	'result.result': "Resultaat:",
	'result.detailed question breakdown': "Gedetailleerd overzicht",
	'result.question number': "Vraag nummer",
	'result.question score': "Score",

	'end.exam has finished': "De toets is afgelopen. Je kunt het venster sluiten.",

	'control.confirm leave': "De toets is nog niet af.",
	'control.not all questions answered': "Je hebt niet alle vragen in deze toets beantwoord.",
	'control.confirm end': "Weet je zeker dat je de toets wilt afsluiten? Als je afsluit kun je geen antwoorden meer wijzigen.",
	'control.confirm regen': "Weet je zeker dat je deze vraag opnieuw wilt maken? Als je opnieuw begint verlies je je huidige score.",
	'control.confirm reveal': "Wil je het antwoord zien? Je verliest je huidige score en kunt de vraag later niet opnieuw beantwoorden.",
	'control.regen': "Probeer opnieuw",
	'control.submit answer': "Verzend",
	'control.submit all parts': "Verzend alles",
	'control.submit again': "Verzend opnieuw",
	'control.submit': "Verzend",
	'control.previous': "Vorige",
	'control.next': "Volgende",
	'control.advice': "Uitwerking",
	'control.reveal': "Laat zien",
	'control.total': "Totaal",
	'control.pause': "Pauze",
	'control.end exam': "Klaar",

	'display.part.jme.error making maths': "Fout tijdens weergeven formule",
	
	'exam.xml.bad root': "Top element van toets XML moet 'exam' zijn",
	'exam.changeQuestion.no questions': "Deze toets bevat geen vragen! Controleer het .exam bestand op fouten.",

	'feedback.marks': "<strong>%s</strong> %s",
	'feedback.you were awarded': "Je hebt %s gekregen.",
	'feedback.taken away': "%s %s ingehouden.",

	'jme.tokenise.invalid': "Ongeldige formule: %s",

	'jme.shunt.not enough arguments': "Te weinig argumenten voor operator %s",
	'jme.shunt.no left bracket in function': "Linker haakje ontbreekt in functieaanroep of rijtje",
	'jme.shunt.no left square bracket': "Linker haakje ontbreekt",
	'jme.shunt.no left bracket': "Linker haakje ontbreekt",
	'jme.shunt.no right bracket': "Rechter haakje ontbreekt",
	'jme.shunt.no right square bracket': "Rechter blokhaak ontbreekt aan het einde van de lijst",
	'jme.shunt.missing operator': "Formule kan niet berekend worden -- operator ontbreekt.",

	'jme.typecheck.function maybe implicit multiplication': "Operator %s is niet gedefinieerd. Bedoel je <br/><code>%s*%s(...)</code>?",
	'jme.typecheck.function not defined': "Operator '%s' is niet gedefinieerd. Bedoel je <br/><code>%s*(...)</code>?",
	'jme.typecheck.op not defined': "Operator '%s' is niet gedefinieerd.",
	'jme.typecheck.no right type definition': "Geen definitie van '%s' bekend van het juiste type.",
	'jme.typecheck.map not on enumerable': "<code>map</code> operator vereist een list of range, niet %s",

	'jme.evaluate.undefined variable': "Variabele %s is niet gedefinieerd",

	'jme.func.switch.no default case': "Default case van Switch statement ontbreekt",
	'jme.func.listval.invalid index': "Ongeldige list index %i voor een list van grootte %i",
	'jme.func.listval.not a list': "Object is niet indexeerbaar",
	'jme.func.matrix.invalid row type': "Een matrix kan niet gemaakt worden uit rijen van type %s",
	'jme.func.except.continuous range': "De 'except' operator kan niet gebruikt worden op continue intervallen.",

	'jme.texsubvars.no right bracket': "Geen passend <code>]</code> in %s argumenten.",
	'jme.texsubvars.missing parameter': "Ontbrekende parameter in %s: %s",
	'jme.texsubvars.no right brace': "Geen passend <code>}</code> in %s",

	'jme.user javascript.error': "Fout in javascript functie <code>%s</code><br/>%s",
	'jme.user javascript.error': "Javascript functie <code>%s</code> geeft geen resultaat terug",

	'jme.variables.variable not defined': "Variabele %s is niet gedefinieerd.",
	'jme.variables.empty definition': "Definitie van variabele %s is leeg.",
	'jme.variables.circular reference': "Circulaire verwijzing naar variabele in vraag %s %s",
	'jme.variables.error computing dependency': "Fout tijdens het berekenen van variabele <code>%s</code>",

	'jme.display.unknown token type': "Kan token van type %s niet naar TeX vertalen",
	'jme.display.collectRuleset.no sets': 'Geen sets opgegeven aan collectRuleset!',
	'jme.display.collectRuleset.set not defined': "Ruleset %s is niet gedefinieerd",
	'jme.display.simplifyTree.no scope given': "Numbas.jme.display.simplifyTree vereist een Scope",

	'math.precround.complex': "Afronden op een complex aantal decimalen is niet mogelijk",
	'math.siground.complex': "Afronden op een complex aantal significante cijfers is niet mogelijk",
	'math.combinations.complex': "Combinaties van complexe getallen kunnen niet berekend worden",
	'math.permutations.complex': "Permutaties van complexe getallen kunnen niet berekend worden",
	'math.gcf.complex': "De GGD van complexe getallen kan niet berekend worden",
	'math.lcm.complex': "Het KGV van complexe getallen kan niet berekend worden",
	'math.lt.order complex numbers': "Complexe getallen kunnen niet geordend worden",
	'math.choose.empty selection': "Een lege selectie gebruikt voor de random functie",

	'matrixmath.abs.non-square': "De determinant van een niet-vierkante matrix kan niet berekend worden.",
	'matrixmath.abs.too big': "Sorry, de determinant van een matrix groter dan 3x3 kan nog niet berekend worden.",
	'matrixmath.mul.different sizes': "Matrices van verschillende grootte kunnen niet vermenigvuldigd worden.",

	'vectormath.cross.not 3d': "Uitproduct is alleen te berekenen voor 3D-vectoren.",
	'vectormath.dot.matrix too big': "Het inproduct is alleen te berekenen voor een matrix met afmetingen $1 \\times N$ of $N \\times 1$.",
	'vectormath.cross.matrix too big': "Uitproduct is alleen te berekenen voor een matrix met afmetingen $1 \\times N$ of $N \\times 1$.",

	'part.marking.steps no matter': "Omdat je al alle punten voor dit onderdeel hebt leveren de afzonderlijke stappen geen punten meer op.",
	'part.marking.steps change single': "Je krijgt <strong>%s</strong> punt voor je antwoorden bij de verschillende stappen",
	'part.marking.steps change plural': "Je krijgt <strong>%s</strong> punten voor je antwoorden bij de verschillende stappen",
	'part.marking.revealed steps with penalty single': "Je hebt de stappen bekeken. Het maximale aantal punten voor dit onderdeel is <strong>%s</strong>. Je score wordt verlaagd.",
	'part.marking.revealed steps with penalty plural': "Je hebt de stappen bekeken. Het maximale aantal punten voor dit onderdeel is <strong>%s</strong>. Je score wordt verlaagd.",
	'part.marking.revealed steps no penalty': "Je hebt de stappen bekeken.",
	'part.marking.not submitted': "Geen antwoord verzonden",
	'part.marking.did not answer': "Je hebt deze vraag niet beantwoord.",
	'part.marking.total score single': "Je krijgt <strong>%s</strong> punt voor dit onderdeel.",
	'part.marking.total score plural': "Je krijgt <strong>%s</strong> punten voor dit onderdeel.",
	'part.marking.nothing entered': "Je hebt geen antwoord ingevuld.",
	'part.marking.incorrect': "Je antwoord is fout.",
	'part.marking.correct': "Je antwoord is goed.",
	'part.correct answer': "Goede antwoord:",

	'part.missing type attribute': "Onderdeeltype ontbreekt",
	'part.unknown type': "Onderdeeltype %s is onbekend",

	'part.setting not present': "Property '%s' onbekend in onderdeel %s van vraag \"%s\"",

	'part.jme.answer missing': "Goede antwoord voor een JME onderdeel ontbreekt (%s)",
	'part.jme.answer too long': "Je antwoord is te lang.",
	'part.jme.answer too short': "Je antwoord is te kort.",
	'part.jme.answer invalid': "Je antwoord is geen geldige formule.<br/>%s",
	'part.jme.marking.correct': "Je antwoord heeft de juiste waarde.",
	'part.jme.must-have bits': '<span class="monospace">%s</span>',
	'part.jme.must-have one': "In je antwoord moet %s voorkomen",
	'part.jme.must-have several': "In je antwoord moet %s allemaal voorkomen",
	'part.jme.not-allowed bits': '<span class="monospace">%s</span>',
	'part.jme.not-allowed one': "In je antwoord mag %s niet voorkomen",
	'part.jme.not-allowed several': "In je antwoord mag niets uit %s voorkomen",

	'part.patternmatch.display answer missing': "Display answer ontbreekt in het Pattern Match onderdeel (%s)",
	'part.patternmatch.correct except case': "Je antwoord is goed, maar je haalt hoofd- en kleine letters door elkaar.",

	'part.numberentry.correct except decimal': "Je antwoord is goed maar mag geen decimaal getal zijn.",
	'part.numberentry.answer invalid': "Je hebt geen geldig getal ingevoerd.",

	'part.mcq.choices missing': "Antwoordmogelijkheden voor Multiple Response onderdeel (%s) ontbreken",
	'part.mcq.matrix not a number': "In onderdeel %s specificeert cel %s,%s van de scorematrix geen getal",
	'part.mcq.wrong number of choices': "Je hebt het verkeerde aantal mogelijkheden geselecteerd.",
	'part.mcq.no choices selected': "Geen keuze gemaakt.",
	'part.mcq.matrix not a list': "De scorematrix van een Multiple Response onderdeel, gegeven door een JME expressie, moet een list zijn maar is het niet.",
	'part.mcq.correct choice': "Je hebt het juiste antwoord gekozen.",

	'part.gapfill.feedback header': '<strong>Vak %i</strong>',
	
	'question.unsupported part type': "Onbekend onderdeeltype",
	'question.header': "Vraag %i",
	'question.substituting': "Fout tijdens uitschrijven: <br/>%s<br/>%s",
	'question.submit part': "Verzend antwoord",
	'question.show steps': "Laat stappen zien",
	'question.advice': "Uitwerking",
	'question.no such part': "Onderdeel %s ontbreekt",
	'question.can not submit': "Antwoord kan niet verzonden worden - controleer op fouten.",
	'question.answer submitted': "Antwoord verzonden",

	'question.score feedback.show': 'Geef feedback',
	'question.score feedback.hide': 'Verberg',
	'question.score feedback.answered total actual': "Score: %(score)/%(marks)",
	'question.score feedback.answered total': "%(marksString). Beantwoord.",
	'question.score feedback.answered actual': "Score: %(scoreString)",
	'question.score feedback.answered': "Beantwoord.",
	'question.score feedback.unanswered total': "%(marksString).",
	
	'timing.no accumulator': "no timing accumulator %s",
	'timing.time remaining': "Resterende tijd: %s",
	
	'xml.could not load': "Het XML document kan niet geladen worden: %s",
	'xml.property not number': "Property %s moet een getal zijn maar is het niet (%s), in node %s",
	'xml.property not boolean': "Property %s moet een boolean zijn maar is het niet (%s), in node %s",

	'scorm.failed save': "De gegevens konden niet opgeslagen worden op de server. Je huidige sessie, inclusief antwoorden en scores, is misschien niet bewaard. Je kunt het nog eens proberen. Mail naar <a href=\"mailto:numbas@ncl.ac.uk\">numbas@ncl.ac.uk</a> als dit vaker voorkomt.",

	'mark': 'punt',
	'marks': 'punten',
	'was': 'was',
	'were': 'waren'
});
