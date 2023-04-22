DROP TABLE instructor;
DROP TABLE yoga;
DROP TABLE users;

CREATE TABLE yoga (
  id SERIAL PRIMARY KEY UNIQUE,
  title VARCHAR NOT NULL,
  intensity VARCHAR NOT NULL,
  duration INT NOT NULL,
  thumbnailimageurl VARCHAR UNIQUE NOT NULL,
  videoembeddedurl VARCHAR UNIQUE NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE instructor (
  id SERIAL PRIMARY KEY UNIQUE,
  name VARCHAR NOT NULL,
  handle VARCHAR NOT NULL,
  avatar VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY UNIQUE,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  birthday DATE NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Deep Stretch Total Body Yoga', 'Intermediate', '45', 'https://i.ytimg.com/vi/GLy2rYHwUqY/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAiJxiRhmzcb4dokdTRyyoiAUTaBQ',	'https://www.youtube.com/embed/GLy2rYHwUqY', 	'Total Body Yoga is a deep stretch practice for the legs, back, and hips. This session invites you on the mat to go deeper. This 45 min yoga practice is great for the lower back and the HIPS! Lean in, breathe deep, stretch it out, and connect to something big.');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Morning Yoga Flow', 'Beginner', '15', 'https://i.ytimg.com/vi/Vr3h5X9kmUo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCP2hCnlYmNxjM1eEdNu0LZHjZuQA', 'https://www.youtube.com/watch?v=Vr3h5X9kmUo&ab_channel=MoveWithNicole', 'Start your day right with this 15 Minute Morning Yoga Flow. I hope you enjoy it and that you are left feeling balanced, energised and ready for the day ahead!');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Yoga for Stress & Anxiety Relief', 'Beginner', '20', 'https://i.ytimg.com/vi/sTANio_2E0Q/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClFA0__HkAe07zdEic0hfW8hW_6A', 'https://www.youtube.com/watch?v=sTANio_2E0Q&ab_channel=MadFit', 'De-stress with this 20 minute calming yoga routine that includes light and easy full body stretches for stress relief and anxiety.');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Yoga Full Body Stretch', 'Beginner', '10', 'https://i.ytimg.com/vi/4stMjL9PioE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDlxZcLAhyqigRSysLRVuUKYDSBmQ', 'https://www.youtube.com/watch?v=4stMjL9PioE&ab_channel=YogaWithBird', 'Do this quick 10 minute yoga for a full body stretch anytime of the day to help release tension and stress from the body and mind.');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description) 
VALUES ('Full Body Deep Stretches Yoga Flo', 'Advanced', '30', 'https://i.ytimg.com/vi/8lkJi4ldZ90/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&amp;rs=AOn4CLBFV_aCdtLrEedXS4hrnGkBc31COQ', 'https://www.youtube.com/watch?v=8lkJi4ldZ90&feature=youtu.be&ab_channel=BreatheandFlow', 'Welcome to this full body deep stretches Breathe and Flow vinyasa yoga class! Today we are focusing on hip openers, twists, backbends, glutes, hamstrings and shoulder openers. We will finish the practice with breathwork (sama vritti) in savasana.');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Full Body Stretch & Strengthen', 'Intermediate', '30', 'https://i.ytimg.com/vi/mPYA6_rKdtU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDrgK48lFcD-gzCtiX9s67q6u71Ow', 'https://www.youtube.com/embed/mPYA6_rKdtU', 'The class will begin by bringing ourselves into the present moment by setting an intention, then we will move into seated stretches and a main sequence including full body stretches, twists and a little core work!');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Full Body Yoga for Strength & Flexibility', 'Advanced', '25', 'https://i.ytimg.com/vi/Eml2xnoLpYE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBTnUFk0gXqMGAgvecmjVLFeFzjRA', 'https://www.youtube.com/watch?v=Eml2xnoLpYE&ab_channel=growingannanas', 'Powerful Yoga Workout for Strength & Flexibility. Join us for a 25 Minute Flow. Open the hips, the shoulders, and tap into your core strength.');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Full Body Gentle Yoga Practice for Beginners and Athletes', 'Beginner', '22', 'https://i.ytimg.com/vi/B4kNiCWTl7M/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB-jWaxSXvvaGPXuOx4j8-AKfSBUQ', 'https://www.youtube.com/watch?v=B4kNiCWTl7M&ab_channel=BreatheandFlow', 'This is a 22 minute full body gentle yoga practice for beginners. Ideal for athletes and easy days to recover, stretch and strengthen.');

INSERT INTO yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Yoga For Your Core', 'Beginner', '27', 'https://i.ytimg.com/vi/_Mx24iENIEY/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCAEm5jPV576nq0VsUCJMlEwg1QyA', 'https://www.youtube.com/watch?v=_Mx24iENIEY&t=1414s&ab_channel=YogaWithAdriene', 'Who says you cannot have it all? It is all about balance. This session takes you on a journey from deep core activation, through strength and conditioning, on to exquisite rest. All designed to foster a balanced and happy equilibrium for the day.');

INSERT INTO instructor (name, handle, avatar)
VALUES ('Adrienne', 'Yoga with Adrienne', 'https://yt3.googleusercontent.com/ytc/AGIKgqMjL_sxyKbuze9liPIXaM5EYxXGxa69J3bE79aP2Q=s176-c-k-c0x00ffffff-no-rj');

INSERT INTO instructor (name, handle, avatar)
VALUES ('Nicole', 'Yoga by Nicole', 'https://yt3.googleusercontent.com/AyujjrnTpLDbINUeVwhy8oGiYCZUlaXU9QG8ku0fp6eIC-_tiuLuf3IMXb-Y6NP93-zZBpNk=s176-c-k-c0x00ffffff-no-rj');

INSERT INTO instructor (name, handle, avatar)
VALUES ('Maddie', 'MadFit', 'https://yt3.googleusercontent.com/sK43gp6tWrF6peB46z2zi5IdOfgWuMzUJzVdpjB1IzlcmS7t6_sviJjj0UmsnJrxri0SO3DaW4k=s176-c-k-c0x00ffffff-no-rj');

INSERT INTO instructor (name, handle, avatar)
VALUES ('Bird', 'Yoga with Bird', 'https://yt3.googleusercontent.com/gytX6pfqzMfjIAor2thgHmBi2KqlvB2SkxmLzyXRyBYRE5J686R_iKMfcAG__tE1yD3VA4GW5_I=s176-c-k-c0x00ffffff-no-rj');

INSERT INTO instructor (name, handle, avatar)
VALUES ('Flo', 'Breathe and Flow', 'https://yt3.googleusercontent.com/ncpSh1RoLkfwE_NqpeY5Cxs-y-CfoQLYWY9TYT6vWGcyDAlc_ix3T570avJm1-N5YM2YCyRbkA=s176-c-k-c0x00ffffff-no-rj');

INSERT INTO instructor (name, handle, avatar)
VALUES ('Jessica', 'Jessica Richburg', 'https://yt3.googleusercontent.com/ytc/AGIKgqM7z7LW_ML1WtIje3vViiJOlJ7OXMSgfQW6i4kZHvY=s176-c-k-c0x00ffffff-no-rj');

INSERT INTO instructor (name, handle, avatar)
VALUES ('Anna', 'growingannanas', 'https://yt3.googleusercontent.com/ytc/AGIKgqMexaV0Firm0zPaAtGK7FmFOypb3OTgCfm4ef53sg=s176-c-k-c0x00ffffff-no-rj');

CREATE TABLE instructoryoga (
  id SERIAL PRIMARY KEY,
  instructor_id INT,
  FOREIGN KEY (instructor_id) REFERENCES instructor(id),
  yoga_id INT,
  FOREIGN KEY (yoga_id) REFERENCES yoga(id)
);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (1,1);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (2,2);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (3,3);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (4,4);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (5,5);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (6,6);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (7,7);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (5,8);

INSERT INTO instructoryoga (instructor_id, yoga_id)
VALUES (1,9);

-- after users table is created
CREATE TABLE usersyoga (
  id SERIAL PRIMARY KEY,
  users_id INT,
  FOREIGN KEY (users_id) REFERENCES users(id),
  yoga_id INT,
  FOREIGN KEY (yoga_id) REFERENCES yoga(id)
);

-- test bookmark feature
INSERT INTO usersyoga (users_id, yoga_id) VALUES ('1', '1');
INSERT INTO usersyoga (users_id, yoga_id) VALUES ('1','2') RETURNING *;