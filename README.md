# reactNative_Standard
Coding standard in react-native.

The first step of the coding standard is set by creating the proper folder structure. The most basic and reliable structure you can follow in react-native is to create src folder on the root folder and after that create all the necesarry folder under src folder like 

assets - In this folder all the images, fonts, icon will be stored.
components - This folder will be used for creating the reuseable component
config - This folder will be used for storing the configuration files.
navigation - This folder will contain all the navigation file like stack navigator file and other route file etc.
providers - If we are using any third party service provider, it will be store in this folder like suppose we want to send sms out to user if they perform some activity than we can add sms sending code in this folder which we can reuse.
screens- This folder will contain all the screens file.
Styles - This folder will contain all the css of the complete mobile app which we will be using all over the app.
redux - This folder will contain all the redux related files, it will have folder for reducers and services.


Naming Convention
====================
Whenever you are creating any vaiable or any function make sure you follow the standards which are used by everyone so whenever any other developer or person is going through the code he will be easily able to understand the function and variable's use just by the name. 

Make sure when create variable and function you use same notation in complete project don't use like camel notation at some place and snake notation at some place that would be creating problem in understanding like first_name and firstName.

Make sure the name which you use is completely sensible, if we are taking first name from the user use variable name like firstName not like a or name, it might create confusion later on for other developers if they work on your project.

The class name should be declared as the file name that will be easy during importing and to maintain the standard declaration

Eg:
Function and variable: When you are creating function make sure to use camel notation. NearByBackGroundEvent(), sendMoney
Screenshot: https://www.screencast.com/t/UwEVQfIZkT8v

Constant variable: When you are creating constant variable, make sure to make it in capital so that anyone can see it as constant. SET_MAX_WIDTH, SET_MAX_HEIGTH, BASE_URL

Class name: The first letter of class name should always be capital. 

Folder and file name: A folder and sub folder name should always start with small letters and the files belongs the folders is always in pascal case. https://www.screencast.com/t/duHhjziJnwt


Other important thing to take care of
========================================
-> Avoid giving in-line css.

-> When you are running .map() or .filter() function on a variable, make sure you check whether the variable is undefined or null condition before running the function, so chance of that function not working will be minimal.

-> When doing api call try to manage it using async await so that the delay in api call can be manage by it.

-> During development phase, add comments above the functions like what is the use of function so at later stage if we have to do any change in the function than we can have more clear idea what was the use of the function and why we were using it previously.

-> Remove all the unnecesarry console.log() after the development in completed so that the code will be looking clean.

-> Checking internet connection, most of all the app which we will be creating are going to connect to server so if the user is trying to access the app without internet connection the app will be crash, so to avoid crashing of the app, it is important to check the internet connection and give proper error message.

-> Adding loader when fetching the data from the api, so that user can have clear idea data are being fetch so we has to wait.

If you follow above standard while creating project in react-native. Your project will  be well maintained.
For more details you can view any of the below link.

https://gilshaan.medium.com/react-native-coding-standards-and-best-practices-5b4b5c9f4076

https://thoughtbot.com/blog/best-practices-while-developing-a-react-native-app

https://practices.credencys.com/reactnative/Naming_Conventions/Components_and_Files
