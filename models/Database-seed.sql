CREATE TABLE Yoga (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  intensity VARCHAR NOT NULL,
  duration INT NOT NULL,
  thumbnailimageurl VARCHAR UNIQUE NOT NULL,
  videoembeddedurl VARCHAR UNIQUE NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE Instructor (
  id SERIAL PRIMARY KEY,
  Yoga_id INT NOT NULL,
  name VARCHAR NOT NULL,
  handle VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (Yoga_id) REFERENCES Yoga(id)
);

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  Yoga_id INT NOT NULL,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  birthday DATE NOT NULL,
  password VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (Yoga_id) REFERENCES Yoga(id)
);


INSERT INTO Yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Deep Stretch Total Body Yoga', 'Intermediate', '45', 'https://i.ytimg.com/vi/GLy2rYHwUqY/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAiJxiRhmzcb4dokdTRyyoiAUTaBQ',	'https://www.youtube.com/embed/GLy2rYHwUqY', 	'Total Body Yoga is a deep stretch practice for the legs, back, and hips. This session invites you on the mat to go deeper. This 45 min yoga practice is great for the lower back and the HIPS! Lean in, breathe deep, stretch it out, and connect to something big.');

INSERT INTO Yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Morning Yoga Flow', 'Beginner', '15', 'https://i.ytimg.com/vi/Vr3h5X9kmUo/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCP2hCnlYmNxjM1eEdNu0LZHjZuQA', 'https://www.youtube.com/watch?v=Vr3h5X9kmUo&ab_channel=MoveWithNicole', 'Start your day right with this 15 Minute Morning Yoga Flow. I hope you enjoy it and that you are left feeling balanced, energised and ready for the day ahead!');

INSERT INTO Yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Yoga for Stress & Anxiety Relief', 'Beginner', '20', 'https://i.ytimg.com/vi/sTANio_2E0Q/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLClFA0__HkAe07zdEic0hfW8hW_6A', 'https://www.youtube.com/watch?v=sTANio_2E0Q&ab_channel=MadFit', 'De-stress with this 20 minute calming yoga routine that includes light and easy full body stretches for stress relief and anxiety.');

INSERT INTO Yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Evening Yoga Flow', 'Basic', '20', 'https://i.ytimg.com/vi/gXuq4M5rU9E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBQPkD1RDrir7FLgloL3GzFmPrzaQ', 'https://www.youtube.com/watch?v=gXuq4M5rU9E&ab_channel=JessicaRichburg', 'This is a 20 minute full body yoga flow aimed to relax your body and calm your mind at the end of the day. Perfect sequence for all levels. Practice this flow regularly and incorporate it into your evening routine. No props needed. See you on the mat!');

INSERT INTO Yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description) 
VALUES ('Full Body Deep Stretches Yoga Flo', 'Advanced', '30', 'https://i.ytimg.com/vi/8lkJi4ldZ90/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&amp;rs=AOn4CLBFV_aCdtLrEedXS4hrnGkBc31COQ', 'https://www.youtube.com/watch?v=8lkJi4ldZ90&feature=youtu.be&ab_channel=BreatheandFlow', 'Welcome to this full body deep stretches Breathe and Flow vinyasa yoga class! Today we are focusing on hip openers, twists, backbends, glutes, hamstrings and shoulder openers. We will finish the practice with breathwork (sama vritti) in savasana.');

INSERT INTO Yoga (title, intensity, duration, thumbnailimageurl, videoembeddedurl, description)
VALUES ('Full Body Stretch & Strengthen', 'Intermediate', '30', 'https://i.ytimg.com/vi/mPYA6_rKdtU/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDrgK48lFcD-gzCtiX9s67q6u71Ow', 'https://www.youtube.com/embed/mPYA6_rKdtU', 'The class will begin by bringing ourselves into the present moment by setting an intention, then we will move into seated stretches and a main sequence including full body stretches, twists and a little core work!');

INSERT INTO Instructor (Yoga_id, name, handle)
VALUES ('1', 'Adrienne', 'Yoga with Adrienne');

INSERT INTO Instructor (Yoga_id, name, handle)
VALUES ('2', 'Nicole', 'Yoga by Nicole');

INSERT INTO Instructor (Yoga_id, name, handle)
VALUES ('3', 'Maddie', 'MadFit');

INSERT INTO Instructor (Yoga_id, name, handle)
VALUES ('4', 'Jessica', 'Jess Yoga');

INSERT INTO Instructor (Yoga_id, name, handle)
VALUES ('5', 'Flo', 'Breathe and Flow');

INSERT INTO Instructor (Yoga_id, name, handle)
VALUES ('6', 'Jessica', 'Jessica Richburg');