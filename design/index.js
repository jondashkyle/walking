var css = require('sheetify')

css('nanoreset')
css('./utilities.js')

css`
  html {
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings:"kern" 1; 
    -ms-font-feature-settings:"kern" 1; 
    -o-font-feature-settings:"kern" 1; 
    -webkit-font-feature-settings:"kern" 1; 
    font-feature-settings:"kern" 1;
    font-kerning: normal
  }

  .copy { max-width: 28rem }
  .copy > *+* { margin: 1.5rem 0 }

  li {
    list-style: none;
    position: relative;
    padding-left: 1.5rem;
  }

  ul li:before {
    content: '';
    position: absolute;
    top: 0.45rem;
    left: 0;
    height: 0.75rem;
    width: 0.75rem;
    border-radius: 50%;
    border: 1px solid #000;
  }

  ol li:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
  }

  ol li:nth-child(1):before { content: '1' }
  ol li:nth-child(2):before { content: '2' }
  ol li:nth-child(3):before { content: '3' }
  ol li:nth-child(4):before { content: '4' }
  ol li:nth-child(5):before { content: '5' }
  ol li:nth-child(6):before { content: '6' }

  @font-face {
    font-family: 'Lars Sans';
    src: url('/assets/fonts/Lars-Light.eot');
    src: url('/assets/fonts/Lars-Light.eot?#iefix') format('embedded-opentype'),
         url('/assets/fonts/Lars-Light.woff2') format('woff2'),
         url('/assets/fonts/Lars-Light.woff') format('woff');
  } 

  @font-face {
    font-family: 'Lars Mono';
    src: url('/assets/fonts/Lars-Mono.eot');
    src: url('/assets/fonts/Lars-Mono.eot?#iefix') format('embedded-opentype'),
         url('/assets/fonts/Lars-Mono.woff2') format('woff2'),
         url('/assets/fonts/Lars-Mono.woff') format('woff');
  } 
`
