//const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
//const regexPass= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/
const regexName = /^[a-zA-Z]+$/

export default function Validation(dogData) {
 var errors = {};
 console.log(dogData)

 //console.log(dogData.username.length)
//name validation
 if (!dogData.name) {
   errors.name = 'Name is required';
// }else if (dogData.name.length<3) {
//    errors.name = 'Must contain at least 3 characters';
}else if (!regexName.test(dogData.name)) { //a-Z checking
   errors.name = 'Invalid name given';
}
//min_life_span validation
if (!dogData.min_life_span) {
   errors.min_life_span = 'Minimun life span is required';
}else if (dogData.min_life_span < 6) {
   errors.min_life_span = 'Must be 6 year or more';
}else if (dogData.min_life_span > 13  ) {
   errors.min_life_span = 'Must be less than 14 years';
}   

//max_life_span validation
if (!dogData.max_life_span) {
   errors.max_life_span = 'Maximun life span is required';
}else if (dogData.max_life_span < 8) {
   errors.max_life_span = 'Must be 8 year or more';
}else if (dogData.max_life_span > 20  ) {
   errors.max_life_span = 'Must be less than 21 years';
}    

//min_height validation
if (!dogData.min_height) {
   errors.min_height = 'Minimun height is required';
}else if (dogData.min_height < 15) {
   errors.min_height = 'Must be 15 inches or more';
}else if (dogData.min_height > 76  ) {
   errors.min_height = 'Must be less than 77 inches';
}  

//max_height validation
if (!dogData.max_height) {
   errors.max_height = 'Maximun height is required';
}else if (dogData.max_height < 15) {
   errors.max_height = 'Must be 23 inches or more';
}else if (dogData.max_height > 90  ) {
   errors.max_height = 'Must be less than 90 inches';
}    

//min_weight validation
if (!dogData.min_weight) {
   errors.min_weight = 'Minimun weight is required';
}else if (dogData.min_weight < 6) {
   errors.min_weight = 'Must be 15 pounds or more';
}else if (dogData.min_weight > 59  ) {
   errors.min_weight = 'Must be less than 60 pounds';
}  

//max_weight validation
if (!dogData.max_weight) {
   errors.max_weight = 'Maximun weight is required';
}else if (dogData.max_weight < 8) {
   errors.max_weight = 'Must be 8 pounds or more';
}else if (dogData.max_weight > 91  ) {
   errors.max_weight = 'Must be less than 92 pounds';
}

//temperaments validation
console.log(dogData.temperament)
if (!dogData.temperament) {
   errors.temperament = 'At least one temperament must be selected';
}


// if (!regexPass.test(dogData.password)){
//   errors.password = 'Debe contener al menos un numero y entre 6 y 10 caracteres';
// }

return errors;
}