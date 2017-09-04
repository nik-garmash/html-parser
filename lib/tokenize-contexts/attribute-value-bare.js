const cloneState = require('../helpers').cloneDeep
const {
  TOKENIZER_CONTEXT_ATTRIBUTES
} = require('../constants/tokenizer-contexts')
const {
  TOKEN_ATTRIBUTE_VALUE_BARE
} = require('../constants/token-types')

const syntaxHandlers = {
  valueEnd (state) {
    let updatedState = cloneState(state)

    updatedState.tokens.push({
      type: TOKEN_ATTRIBUTE_VALUE_BARE,
      content: state.accumulatedContent
    })

    updatedState.accumulatedContent = ''
    updatedState.caretPosition -= state.decisionBuffer.length
    updatedState.decisionBuffer = ''
    updatedState.currentContextType = TOKENIZER_CONTEXT_ATTRIBUTES

    return updatedState
  }
}

function parseSyntax (chars) {
  const BARE_VALUE_END_PATTERN = /\s/

  if (
    BARE_VALUE_END_PATTERN.test(chars)
    || chars === '>'
    || chars === '/'
  ) {
    return syntaxHandlers.valueEnd
  }
}

module.exports = {
  parseSyntax
}