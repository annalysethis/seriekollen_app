// import database from '@react-native-firebase/database';

// const reference = database().ref('/series/');

// export const submitSeries = (Id, title, nextReleaseDate, image) => {
//   return new Promise(function (resolve, reject) {
//     let key;
//     if (Id != null) {
//       key = Id;
//     } else {
//       key = database().ref().push().key;
//     }

//     let dataToSave = {
//       Id: key,
//     };
//     database()
//       .ref('series')
//       .update(dataToSave)
//       .then(snapshot => {
//         resolve(snapshot);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });
// };
