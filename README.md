# turndown-bin

Simple wrapper for using `turndown` to transform `html` into `markdown`

Turndown can be found on [https://github.com/mixmark-io/turndown](https://github.com/mixmark-io/turndown)

### Install

    npm install -g turndown-bin


### Usage

Default options: 

    turndown-bin --in tests/example.html --out tests/markdown.md

You may add a JSON config file for settings special options. 

Information about the options can be found on: [https://github.com/mixmark-io/turndown/tree/master#options](https://github.com/mixmark-io/turndown/tree/master#options)

This is the default options: 

```json
{
    "headingStyle": "setext",
    "hr": "* * *",
    "bulletListMarker": "*",
    "codeBlockStyle": "indented",
    "fence": "```",
    "emDelimiter": "_",
    "strongDelimiter": "**",
    "linkStyle": "inlined",
    "linkReferenceStyle": "full",
    "preformattedCode": false
}
```

    turndown-bin --in tests/example.html --out tests/markdown.md --config config.json


### License

MIT