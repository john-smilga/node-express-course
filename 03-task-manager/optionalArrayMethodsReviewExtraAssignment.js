// Review of JavaScript iterative Array methods (`.map`, `.filter` and `.forEach`)

// This is an optional extra assignment

///////////////////////////// Questions ///////////////////////////////////////

// First, some basic background knowledge questions that we discussed during
// the mentor session

////////////////////
// What is an array?
//
// An array is a data structure which contains a sequence of potentially mixed
// data types. Structures with multiple elements are sometimes called
// "collections"

const stuff = [1, 2, 'fish', { id: 3 }];


//////////////////////////////
///// What is a method? /////
//
// It is a function that operates on a SPECIFIC data structure. This is a
// word from Object Oriented Programming (sometimes called OOP).
//
// In OOP, we consider functions and data as a hybrid "thing." We call those
// "things" objects. In JavaScript, EVERYTHING is an object, including
// functions! But that's kinds of besides the point. The important thing is
// the conceptual idea: data + behavior is thought of as "one thing."

const object = {
  // in OO, we group data and behavior
  data: 1,
  behavior: function() {
    // "this" is a reference to the object we are inside of right now
    this.data++;
    console.log('OOP demo:', this.data);
  }
}

// Every time we call `.behavior()`, the data (number) inside `object` is
// incremented by 1, so we print "OOP demo 1", "OOP demo 2", etc.
object.behavior()
object.behavior()
object.behavior()
object.behavior()
object.behavior()

// That's why we call them "array methods" they are methods that exist on the
// "Array" object.

/////////////////////////////////////////////////
///// What are the common JS array methods? /////
//
// - Array.prototype.push (does not take a callback)
//
// These guys all take a callback as input, and then call the callabck for
// each item in the array
//
// - Array.prototype.filter
//   - The callback should return a boolean. If the return value is true, the
//     element becomes a member of the new array. If the return value is false,
//     the element is filtered (removed).
   const integers = [1, 2, 3, 4, 5];
   // evenNumbers will be interger % 2 for each integer
   const evenNumbers = integers.filter((integer) => {
     return integer % 2 === 0
   })

// - Array.prototype.map
//   - The callback recieves each item of the array. The return value is pushed
//     into a new array
   const numbers = [1, 2, 3];
   const doubles = numbers.map((i) => i * 2);

// - Array.prototype.forEach
//   - `forEach` is like a "for" loop. It calls the callback for every item in
//     the array
   evenNumbers.forEach((thingy) => console.log('even', thingy));
   doubles.forEach((d) => console.log('doubled!', d));

// - Array.prototype.reduce
//   - A bit tricky
//   - Can transform an array into an atribrary result
  const lastNames = ['Smith', 'Toure', 'Hernandez']
  const initialValue = 0;
  const totalLettersInNames = lastNames.reduce((runningTotal, currentName) => {
    return runningTotal + currentName.length;
  }, initialValue)
  console.log({totalLettersInNames});

  // The first argument is always the return value that we're building up.
  // I called it, "runningTotal" before. The default name is "accumulator."
  // Often, Array.prototype.reduce is used to build a mapping from an array,
  // like this:
  const people = [{id: 1, name: 'tim'}, {id: 2, name: 'jane'}];
  const peopleIdMap = people.reduce((map, person) => {
    map[person.id] = person;
    return map;
  }, {} /* second arg is always the initial value! Here, it's an empty object */);

  // Now we can lookup people by id!
  console.log({lookedUpPerson1: peopleIdMap[1]})
  console.log({lookedUpPerson2: peopleIdMap[2]});

  // Sometimes, you'll see this fancy syntax used with reduce, especially when
  // building mappings. Beware, though, there's a lot of unnecessary runtime
  // overhead here, because we create a new object here every time instead of
  // re-using the old one!! And it's only a few characters shorter than the
  // more performant solution above.
  const peopleNameMap = people.reduce((map, person) => ({
    ...map,
    [person.name]: person
  }), {});

  // Now we can lookup people by name!
  console.log({lookupTim: peopleNameMap['tim']})
  console.log({lookupJane: peopleNameMap['jane']});

/////////////////////////// CHALLENGES ////////////////////////////////////////

// Each challenge will be related to this array of names. It will pose a
// problem related to these names, and then implement the solution. The
// challenges are:
//
// - Create a new array with only each person's last name
// - Filter names that don't match the format "<first> <last>"
//   - Should remove Tam because she has a double-space
//   - Should remove Carlow because he has a middle-name
//   - Should also remove names like:
//     - "Timothy      Cook"
//     - "Nick_Masters"
//     - "Timmy-Turner"
//     - "Billy\nBob"
//     - etc.
// - Create a new array where everyone's name is converted to "Title Case"
//   - The first character of each word should be uppercase
//   - All other characters in the word should be lowercase
//   - expected output is ['Dimitry Santiago', 'Carlos D. Perez', 'Tam Person', ...]
// - Last Challenge:
//     Remove names with the wrong format
//     AND change it to "Title Case"
//     AND remove people whose last name ends with z
//     AND write a message asking them to sign up
//
// For an extra assignment, you may implement these yourself! Include your
// changes to this file with your MR for week 3.

const names = [
  'Dimitry SantiAgo',
  'Carlos d. Perez',
  'tam  person',
  'Mariana Gomez',
  'Amy You'
];

///////////////////////////////////////////////////////////////////////////////
//// put your answers above if you wish to do the challenges on your own //////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
////////////////////                                       ////////////////////
////////////////////  !                                 !  ////////////////////
////////////////////  !  Read no further if you wish to !  ////////////////////
////////////////////  !     do the extra assignment     !  ////////////////////
////////////////////  !                                 !  ////////////////////
////////////////////                                       ////////////////////
///////////////////////////////////////////////////////////////////////////////
/////// and maybe also delete or comment-out the remainder of this file! //////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

//////// CHALLENGE: Get everyone's last name
const everyonesLastName = names.map((name) => {
  // `.map` can transform each element 1:1
  const eachWordSeparated = name.split(" ")
  // how to get the last index from JS array
  const lastName = eachWordSeparated.pop();
  return lastName;
});
console.log('everyone last name', everyonesLastName);

//////// CHALLENGE: Filter to the people who followed the right
// "right format" is "<first name> <last name>" with a single space!
const rightFormat = /^\w+ \w+$/;
const matchesTeachersPedanticFormattingRule = names.filter((name) => {
  return name.match(rightFormat);
});
console.log('good students', matchesTeachersPedanticFormattingRule)
// (joke :)


//////// CHALLENGE: Change everyone's name to "Title Case"
// (Each Word Uppercase)

// Time complexity is O(n^3): AKA very slow!! This is not an ideal solution in
// terms of performance, but it does a great job of stretching our understanding
// of Array.map

// The next section will breakdown this example in much greater detail!

const titledNames = names.map((name) => {
  // `.map` can transform each element 1:1
  const eachWordSeparated = name.split(" ")

  const titledName = eachWordSeparated.map((inputWord) => {
    const inputLetters = inputWord.split("");
    const wordWithFirstLetterUppercase = inputLetters
      .map((letter, idx) => (
        idx === 0
          ? letter.toUpperCase()
          : letter.toLowerCase()
      ))
      .join("")
    return wordWithFirstLetterUppercase
  });
  return titledName.join(" ")
});
console.log('titledNames', titledNames);

// Same example as above (change every name to title case), but I'll break it
// up into smaller pieces to make it more readable. Each callback function
// which was "inlined" before are now defined as separate functions, given a
// name, and documented

/**
 * This is the callback for the innermost map. Map functions always take two
 * parameters: the array element, and the index of the array element.
 *
 * In this case, we give these 2 pieces meaningful names: characterInWord,
 * and indexOfCharacter. Remember POSITIONAL arguments (like `(item, index)`)
 * are identified by POSITION. As long as a POSITIONAL argument is in the
 * correct POSITION you can give it any name. The best practice is to use
 * the most descriptive and clear names you can, which we've done here.
 */
const transformWordIntoTitle = (characterInWord, indexOfCharacter) => {
  // We only want to change the FIRST letter of the word to uppercase
  if (indexOfCharacter === 0) {
    return characterInWord.toUpperCase();
  } // we have returned!! The rest of the code will ONLY run for characters
    // after the first one

  // We could skip `.toLowerCase`, but if a letter in the middle of the word
  // is uPpErcAse, it'll look nicer if we transform it into lowercase
  return characterInWord.toLowerCase();
}

/**
 * This is the callback used when we are mapping over an array of "words," like:
 *
 * ```
 * ["Carlos", "d.", "Perez"]
 * ```
 *
 * This function receives a string (just ONE of those words, like "d.").
 *
 * It will split the word up into an array of letters, use the map function
 * from before to transform that array into title-case, then join that
 * transformed array back into a string, and return the result.
 *
 * This is the most wasteful & superfluous step. You probably notice we could
 * just do this instead:
 *
 * ```
 * firstLetter = wordInString[0];
 * otherLetters = wordInString.splice(1);
 * return `${firstLetter.toLowerCase()}${otherLetters.toLowerCase()}`
 * ```
 *
 * Indeed, this would be much faster since we avoid an inner loop, but our goal
 * is to learn, not to go fast!
 */
const transformStringIntoTitledWords = (wordInString) => {
  const letters = wordInString.split('');
  const titleCaseLetters = letters.map(transformWordIntoTitle);
  return titleCaseLetters.join('');
}

/**
 * Finally, the highest level: this callback operates on every string in our
 * main name array for this example. It breaks the name up into an array of
 * words first:
 *
 * ```
 * "carlos cantiago"
 *    -> ["carlos", "cantiago"]
 *      -> ["Carlos", "Santiago"]
 *        -> "Carlos Santiago"
 * ```
 */
const transformNameIntoTitleCase = (name) => {
  // We'll use a regex to split the string. ' +' means "one or more spaces."
  // This is good because it'll work for our name "tam  person" where there is
  // a double-space
  const nameWords = name.split(/ +/);
  const titleCaseWords = nameWords.map(transformStringIntoTitledWords)
  return titleCaseWords.join(' ');
}

console.log(
  'titledNames verbose',
  names.map(transformNameIntoTitleCase)
)


//////// CHALLENGE: Remove names with the wrong format
//                  AND change it to "Title Case"
//                  AND remove people whose last name ends with z
//                  AND write a message asking them to sign up
const result = names
  // remove bad format
  .filter((name) => name.match(rightFormat))
  // change to title case
  .map(transformNameIntoTitleCase)
  // remove names that end in "z"
  .filter((name) => {
    const lastLetter = name.slice(-1);
    return lastLetter.toLowerCase() !== 'z'
  })
  // transform into a sign-up message
  .map((name) => `
    Hey there ${name}!
    Want to buy my thing?
  `);

console.log('result', result);
