const regexName = /^[a-zA-Z]+$/

export default function Validate(inputs) {
var errors = {};

//name validation
 if (!inputs.name) {
   errors.name = 'Name is required';
}else if (inputs.name.length<3) {
   errors.name = 'Must contain at least 3 characters';
}else if (!regexName.test(inputs.name)) { //a-Z checking
   errors.name = 'Invalid name given';
}

//min_life_span validation
if (inputs.name.length>2 && !inputs.min_life_span) {
   errors.min_life_span = 'Minimun life span is required';
}else if (inputs.name.length>2 && inputs.min_life_span < 6) {
   errors.min_life_span = 'Must be 6 year or more';
}else if (inputs.name.length>2 && inputs.min_life_span > 13  ) {
   errors.min_life_span = 'Must be less than 14 years';
}   

//max_life_span validation
if (inputs.min_life_span.length>0 && !inputs.max_life_span) {
   errors.max_life_span = 'Maximun life span is required';
}else if (inputs.min_life_span.length>0 && inputs.max_life_span < 8) {
   errors.max_life_span = 'Must be 8 year or more';
}else if (inputs.min_life_span.length>0 && inputs.max_life_span > 20  ) {
   errors.max_life_span = 'Must be less than 21 years';
}    

//min_height validation
if (inputs.max_life_span.length>0 && !inputs.min_height) {
   errors.min_height = 'Minimun height is required';
}else if (inputs.max_life_span.length>0 && inputs.min_height < 15) {
   errors.min_height = 'Must be 15 inches or more';
}else if (inputs.max_life_span.length>0 &&inputs.min_height > 76  ) {
   errors.min_height = 'Must be less than 77 inches';
}  

//max_height validation
if (inputs.min_height.length>1 && !inputs.max_height) {
   errors.max_height = 'Maximun height is required';
}else if (inputs.min_height.length>1 &&inputs.max_height < 15) {
   errors.max_height = 'Must be 23 inches or more';
}else if (inputs.min_height.length>1 && inputs.max_height > 90  ) {
   errors.max_height = 'Must be less than 90 inches';
}    

//min_weight validation
if (inputs.max_height.length>1 && !inputs.min_weight) {
   errors.min_weight = 'Minimun weight is required';
}else if (inputs.max_height.length>1 && inputs.min_weight < 6) {
   errors.min_weight = 'Must be 15 pounds or more';
}else if (inputs.max_height.length>1 && inputs.min_weight > 59  ) {
   errors.min_weight = 'Must be less than 60 pounds';
}  

//max_weight validation
if (inputs.min_weight.length>0 && !inputs.max_weight) {
   errors.max_weight = 'Maximun weight is required';
}else if (inputs.min_weight.length>0 && inputs.max_weight < 8) {
   errors.max_weight = 'Must be 8 pounds or more';
}else if (inputs.min_weight.length>0 && inputs.max_weight > 110  ) {
   errors.max_weight = 'Must be less than 111 pounds';
}

//temperaments validation
if (inputs.max_weight.length>0 && inputs.temperament.length<1) {
   errors.temperament = 'At least one temperament must be selected';
}

return errors;
}