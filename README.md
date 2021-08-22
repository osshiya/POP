# POP readme

![alt text](https://github.com/osshiya/POP/blob/main/POP/src/assets/images/AppLogo.png)

POP! is a new-age social media mobile application developed by Studio MAGIQ. 

Irfan
- Leader
- UI/UX Designer
- Programmer

Shi Ya
- App Developer
- Technical Artist

Elaine
- Art Director
- Concept Artist

Jia Jun
- Public Relations
- Social Media Manager

<img src="https://github.com/osshiya/POP/blob/main/POP/src/assets/images/StudioLogo_v2.png" width="300">

Users can capture, save, share their valuable memories, moments and events that happen in their life with their phones. Not just that, POP serve as a creativity hub for sharing of ideas, works and projects. The community may just happen to discover this hidden gem of yours while scrolling through the discover page. Anything can happen in POP!

POP! is currently underdevelopment. 

Currently, POP! is a application targeted for students and staff of NP in Singapore. 
POP! is expected to be released in late August only for Android at Google Play Store.
Supported OS 4.0.3 and newer.

Team Github and Studio Blog
- [GitHub](https://github.com/osshiya/POP.git)
- [Studio Development Blog](https://s10198275.wixsite.com/magiq)

Team Member's Individual Blogs
- [Individual Blog - Shi Ya](https://s10187403.wixsite.com/blog)
- [Individual Blog - Irfan](https://s10198275.wixsite.com/irfansblog)
- [Individual Blog - Elaine](https://s10195898.wixsite.com/elainepersonalblog)
- [Individual Blog - Jia Jun]()


## Design Process

Our Application logo's colour scheme is made of colours off NP's official logo as our application is currently targted and serving for NP community only.

POP logo has a cheerful ambience. With vibrant mood colours and impactful design.

For application, we will be using white and black as our main colour scheme. We would be implementing popular design trends into our application design. Such as rounded border corners, gradients and glassmorphism. This is to better serve and keep up with the design trend and preferences of the young and moving society. 

- [Adobe XD](https://xd.adobe.com/view/e7fb1282-5a8e-4e2a-8229-a33eeb2ce993-b2a8/screen/4319ad0d-4174-4485-bbdd-ab92fc622976/)

- Normal User (Boon Keng Lim)
    - usersid: 11111111A
    - password: lims


## Features
- Discover: Discover is where you can find posts from the community sorted by newest.
- Social: Social is where you see posts updated by your following circles sorted by newest.
- Search: Search is where you can find users by their name or username. You also see the top 10 posts by the community at the page.
- Camera: Camera is where you can take pictures or choose pictures from your photo library then upload then as a post or a project with custom fields and descriptions.
- Profile: Profile is your own unique personal space, you can display and showoff anything you want to show to the public.

- Likes: Likes is where you can show your support by supporting posts that are interesting or as an act to support your friends.
- Comment: Comments is to leave feedback or opinion about the post. You can show support or give suggestion of improvement.
- Follow: Follow is to receive updates from a specfic users in your social so that you can keep track of them anytime when they posted a new post.

- Edit Profile: Edit your profile with newest updates, showcase your proudest skills, portfolio links and contact information.
- Check Followers/ Followings: See who you're following or followed by.

- Posts: Sharing of normal posts about your activities or life moments.
- Projects: Showcase your proud works and build them up like a portfolio.
- Liked Posts: See what posts you have liked so far.

- Logout: Logout to swtich account or for safety purposes.

- Validation: Password have to be 3 characters or more, to ensure that your password is secure enough.


## Features Left to Implement
- Forum (Visual-only): Forum is an under-development feature. Forum is where you can start random and interest topics with the community and have a discussion about it. 
- Chat (Visual-only): Chat is an under-development feature. At chat, you can start a private message ot private group chat with other users.
- Activity (Visual-only): Activity is an under-development feature. Activity is similar to a notification center. You can see what is going around in the community or your circles.

- Teams: Set your team and teammates as you post a project done by your team.
- Liked Projects: See what projects you have liked so far.

- Settings: Customise preferences and options.
- Dark Mode: Switch to dark mode for a dark interface.


## Technologies Used
- [Ionic](https://ionicframework.com/)
    - The project uses **Ionic** to create mobile interface and icons.
- [HTML](https://html.com/)
    - The project uses **HTML** to create formatting.
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
    - The project uses **CSS** to modify the components' style.
- [TypeScript](https://www.typescriptlang.org/)
    - The project uses **TypeScript** to create features.
- [php](https://www.php.net/)
    - The project uses **php** to create features.
- [phpMyAdmin](https://www.phpmyadmin.net/)
    - The project uses **phpMyAdmin** to create features.

## Testing
- As a user, I want to login to my account
    - Success: Login page - Types in credentials - Sucess - Discover page
    - Fail: Login page - Types in credentials - Fail - Login page
    - Forget Password: Login page - Forget Password - Forget Password page - Read message

- As a user, I want to follow a user
    - Users from Discover: Discover page - Taps into profile - Follow
    - Search by name/username: Search page - Types in name - Taps into user's profile - Follow
    - Find through a mutual: A mutual's profile - Check their following/ followed - Taps into user's profile - Follow

- As a user, I want to edit my profile
    - Edit Profile: Profile page - Edit Profile - Fills in information - Save

## References
- Ionic Framework APIs
    - https://ionicframework.com/docs/api/

- Uploading Images to Server
    - https://www.youtube.com/watch?v=tph5Nk4Ab1g
    - https://www.youtube.com/watch?v=OydPSVx1-uI
    - https://www.geeksforgeeks.org/php-imagecreatefromstring-function/
    - https://ionicdon.com/how-to-upload-images-from-gallery-and-camera-to-database-in-ionic-3-app/
    - https://www.youtube.com/watch?v=AQg5vHNJnMY
    - https://www.simplifiedcoding.net/android-upload-image-to-server/
    - https://stackoverflow.com/questions/47118760/how-to-take-or-choose-image-from-gallery-in-ionic-3/47120267
    - https://www.youtube.com/watch?v=Nf-mOfmD7X4

- Like and Unlike System
    - https://codewithawa.com/posts/like-and-unlike-system-using-php-and-mysql-database
    - https://stackoverflow.com/questions/7213793/the-database-construction-of-like-button-like-facebook-like-or-google-1/7213818
    - https://www.youtube.com/watch?v=dfxigz3Idoc

- Using ngfor and ngif
    - https://stackoverflow.com/questions/56124085/hide-element-using-ngfor-and-ngif
    - https://stackoverflow.com/questions/58386161/how-to-target-a-specific-element-generated-by-ngfor

- Converting timestamp to days
    - https://stackblitz.com/edit/time-ago?file=app%2Fapp.module.ts
    - https://stackoverflow.com/questions/54976990/how-to-display-date-time-like-6h-ago-format-in-ionic4

- Submitting data to Server through Forms
    - https://stackoverflow.com/questions/51422528/how-to-submit-form-with-method-post-in-angular-2-using-formgroup
    - https://blog.angular-university.io/introduction-to-angular-2-forms-template-driven-vs-model-driven/