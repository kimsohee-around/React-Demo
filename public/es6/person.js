// == Modules ==
// JavaScript modules allow you to break up your code into separate files.
// This makes it easier to maintain the code-base.
// ES Modules rely on the import and export statements.

// Export(내보내기)
export const name = "Jesse"
export const age = 40

// export { name, age }

// default export : You can only have one default export in a file.
const message = () => {
    const name = "Jesse";
    const age = 40;
    return name + ' is ' + age + 'years old.';
  };
  
export default message;

