export const STUDENT_ACCOUNT = `
{
   account {
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