// #popclip
// name: Straighten Quotes
// identifier: com.pilotmoon.popclip.extension.straighten-quotes
// description_: Convert "smart" quotation marks and apostrophes to ASCII quotes.
// icon: 'strike iconify:tabler:quote-filled'
// popclip version: 4688
// keywords: curly quotes smart quotes straight quotes apostrophes

const singleQuotes = /[‘’]/gu;
const doubleQuotes = /[“”]/gu;

defineExtension({
	regex: /[‘’“”]/u,
	action: (input) => popclip.pasteText(straightenQuotes(input.text)),
	test: runTests,
});

function straightenQuotes(text: string): string {
	return text.replace(singleQuotes, "'").replace(doubleQuotes, '"');
}

/* run with:
   /Applications/PopClip.app/Contents/MacOS/PopClip run ./source/StraightenQuotes.popclipext/Config.ts test
   */
function runTests(): void {
	assertEqual(straightenQuotes("‘single’"), "'single'", "curly single quotes");
	assertEqual(straightenQuotes("“double”"), '"double"', "curly double quotes");
	assertEqual(
		straightenQuotes("const message = “It’s ready”;"),
		'const message = "It\'s ready";',
		"source-code example",
	);
	assertEqual(
		straightenQuotes(
			"Keep «localized» „low‟ ＂full-width＂ `backticks` and 5′ 10″.",
		),
		"Keep «localized» „low‟ ＂full-width＂ `backticks` and 5′ 10″.",
		"other quote-like characters stay unchanged",
	);
}

function assertEqual(actual: string, expected: string, label: string): void {
	if (actual !== expected) {
		throw new Error(
			`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
		);
	}
	print(`✓ ${label}: ${JSON.stringify(actual)}`);
}
