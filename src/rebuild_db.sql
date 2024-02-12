DROP DATABASE IF EXISTS my_db;
CREATE DATABASE my_db;
\c my_db;

DROP TABLE IF EXISTS public.candidate;

CREATE TABLE IF NOT EXISTS public.candidate
(
    id serial NOT NULL PRIMARY KEY,
    user_id character varying COLLATE pg_catalog."default" NOT NULL,
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    gender character varying COLLATE pg_catalog."default" NOT NULL,
    age bigint NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    current_job character varying COLLATE pg_catalog."default" NOT NULL,
    pasts_occupations character varying COLLATE pg_catalog."default",
    parents character varying COLLATE pg_catalog."default",
    siblings character varying COLLATE pg_catalog."default",
    height bigint,
    remarks character varying COLLATE pg_catalog."default",
    photos character varying COLLATE pg_catalog."default",
    phone bigint NOT NULL
);

INSERT INTO public.candidate(
	user_id, first_name, last_name, gender, age, address, current_job, pasts_occupations, parents, siblings, height, remarks, photos, phone)
	VALUES 
    ('111222333', 
    'חיה', 
    'אמיר', 
    'בחורה', 
    24, 
    'כפר חבד', 
    'סטודנטית בתוכנית של גוגל ורייכמן', 
    'סטודנטית המכללת עמק יזרעאל', 
    'חיים ואורלי', 
    'ענבר איתמר שגיא נדב', 
    154, 
    'מקווה שתהיו מרוצים מהפרויקט שלי :)\nומאחלת לעצמי לפתח אותו להיות איכותי ולצאת כמוצר אמיתי', 
    'https://api.slingacademy.com/public/sample-photos/10.jpeg', 
    546012967
);
--     ('222333444',
--      'נועם',
--       'אמיר',
--       'בחורה',
--       0,
--       'כפר חבד',
--       'משגעת את המטפלות במעון',
--       'מצטיינת בהליכה',
--       'מני וחיה',
--       'אין',
--       10,
--       'הדבר הכי מתוק בעולם',
--       'https://api.slingacademy.com/public/sample-photos/15.jpeg',
--       0
-- );
--     ('333444555',
--     'מני',
--     'אמיר', 
--     'בחור', 
--     29, 
--     'כפר חבד', 
--     'משווק', 
--     'סטודנט במכללת סלע',  
--     'גלי ולירון', 
--     'שמוליק יוסי שניאור כתריאל', 
--     180, 
--     ';-)',
--     'https://api.slingacademy.com/public/sample-photos/20.jpeg',
--     '585717595'
-- );
--     ('444555666',
--      'שמוליק', 
--      'אמיר', 
--      'בחור', 
--      27, 
--      'כפר חבד', 
--      'ראש צוות בצבא וסטודנט', 
--      'סטודנט להנדסת תוכנה', 
--      'גלי ולירון', 
--      'מני יוסי שניאור כתריאל', 
--      180, 
--      'אם נתקלתם בבאג, הוא המקום למצוא פתרון',
--      'https://api.slingacademy.com/public/sample-photos/24.jpeg',
--      '506677111'
-- );
--     ('555666777', 
--     'יוסי', 
--     'אמיר', 
--     'בחור', 
--     25, 
--     'כפר חבד', 
--     'חייל', 
--     'צורפות',  
--     'גלי ולירון', 
--     'שמוליק מני שניאור כתריאל', 
--     180, 
--     'מזל טוב!!!',
--     'https://api.slingacademy.com/public/sample-photos/28.jpeg',
--     '508877666'
-- );
--     ('666777888', 
--     'שניאור', 
--     'אמיר',
--     'בחור', 
--     23, 
--     'כפר חבד', 
--     'סטודנט להנדסת תוכנה',
--     'שנת שליחות במקום נידח',  
--     'גלי ולירון', 
--     'שמוליק יוסי מני כתריאל', 
--     180, 
--     '- להזמנת עוגות טעימות או דגים מרוקאים -',
--     'https://api.slingacademy.com/public/sample-photos/34.jpeg',
--     '50778883333'
-- );
--     ('888999000', 
--     'כתריאל', 
--     'אמיר', 
--     'בחור', 
--     18, 
--     'כפר חבד', 
--     'סטודנט לביו משו במסלול עתודה', 
--     'מכינה קדם אקדמית',  
--     'גלי ולירון', 
--     'שמוליק יוסי שניאור מני', 
--     180, 
--     'אם אתם מחפשים מישהו לשחק איתו משחקי מחשב כתריאל הכתובת',
--     'https://api.slingacademy.com/public/sample-photos/40.jpeg',
--     '999000111'
--     );

DROP TABLE IF EXISTS public.users;

CREATE TABLE users
(
    "first-name" character varying COLLATE pg_catalog."default" NOT NULL,
    "last-name" character varying COLLATE pg_catalog."default" NOT NULL,
    image character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default" NOT NULL,
    "jwt_token" character varying COLLATE pg_catalog."default" NOT NULL,
    id character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


