Please add any additional notes here…


high level slices: 
run server
load and inspect json data
expose two endpoints 
return appropriate Json responses 

slices of slices: 
- Save the url as consts here in the server file?  
- add a function(s) to get the data (could write just one that takes a url as an arg, and then I can call that in more specific functions later?)
These could then be called in the GET. 
- save the correct props/target the correct props, to a var. 


Decisions: 
seperate concrns with different functions, but use a resusable function for fetching- though caching would be important here in the real world. 

The mapping of the data is something I would have liked to extract into mapping functions that could be imported to make the code cleaner, and increase resusability if required. 

Should have included pagination to gaurd against larger payloads. 

