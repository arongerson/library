export const STUDENT_ACCOUNTS = `
{
   accounts {
      username
      role
      student {
        id
        firstname
        lastname
        borrowedBooks {
          id
          copyNumber
          book {
            title
            author
            isbn
          }
          lending {
            id
            lendingDate
            dueDate
          }
        }
      }
   }
 }`;

 export const BOOKS_WITH_LENDING = `
 {
   books {
     id
     title
     author
     isbn
     copies
     availableCopies
     lentCopies {
       id
       lendingDate
       dueDate
       student {
         id
         firstname
         lastname
       }
       bookCopy {
         id
         copyNumber
       }
     }
     copiesAvailable {
       id
       copyNumber
     }
   }
 }`;

 export const BOOKS = `{
   books {
    id
    title
    author
    isbn
    copies
    availableCopies
   }
 }`;

 export const STUDENT = `{
  student(id: $studentId) {
    id
    firstname
    lastname
  }
}`;

export const BOOK = `{
  book(id: $bookId) {
    id
    title
    isbn
    author
  }
}`;
