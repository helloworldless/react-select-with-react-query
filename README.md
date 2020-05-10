# React Select with React Query

[Open in CodeSandbox](https://codesandbox.io/s/github/paltamadura/react-select-with-react-query)

## Notes

[React Select](https://react-select.com/)

[React Query](https://github.com/tannerlinsley/react-query)

### Select vs. Async Select

Here we we the regular React Select `Select`
component as
opposed to the `AsyncSelect` component which takes a
callback to fetch the
options and doesn't seem to offer a fully controlled
alternative which is conducive to use with
React Query. It should still be possible to use
AsyncSelect with React Query if React Query is used in
[manual mode](https://github.com/tannerlinsley/react-query#manual-querying).
But we didn't want to do that becuase we
wanted to stick with the elegance of the reactive,
custom hook pattern which is so natural with
React Query.

### React Select API

It took quite a lot of work to get React Select
fine-tuned for this use case. Some things aren't very
intitutive, like needing to use two different change
handlers: `onChange` and `onInputChange`.

Also, we gave up on trying to get `menuIsOpen`
working perfectly for this scenario:

- Don't show the menu on the inital click when
  there are no options yet and no search text has
  been input yet

Using just the `menuIsOpen` prop there is an
unintended consequence: if some text is entered
but no option selected and then the input is
blurred, the menu stays open. It seems we would have to use the additional
`onBlur` and `onFocus` handlers to accomplish
this. But that would add a lot more code
and complexity, so we just settled with
the menu opening on the initial click.

### use-select

It would be interesting to check out
[use-select](https://github.com/tannerlinsley/use-select)
from, Tanner Linsley,
the same author as React Query.
