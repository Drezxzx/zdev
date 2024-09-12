
--  CONSULTAS DE CREACION DE TABLAS
CREATE TABLE users(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    profile_pic TEXT DEFAULT "https://res.cloudinary.com/drsdz7hde/image/upload/v1725059307/user-profile-icon-free-vector_lij3vx.jpg"
)

CREATE TABLE language(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE users_languages(
    user_id INTEGER NOT NULL,
    language_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(language_id) REFERENCES language(id),
    PRIMARY KEY(user_id, language_id)
);

CREATE TABLE users_likes(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE posts(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    code TEXT  NULL,
    id_language INTEGER NULL,
    image TEXT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    author_id INTEGER NOT NULL,
    FOREIGN KEY(author_id) REFERENCES users(id)
    FOREIGN KEY(id_language) REFERENCES language(id)
);

CREATE TABLE notifications(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    notification TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE coments(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at TEXT NOT NULL,
    likes INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
 );

CREATE TABLE SHARED_POSTS(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    id_post INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    comment TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(id_post) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE follow_users(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    followed_user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(followed_user_id) REFERENCES users(id)
);

-- ⬇️consultas select⬇️

-- Devuelve el nombre de los usuarios y el nombre de su lenguajes preferidos
SELECT users.name, language.name la from users
INNER JOIN users_languages ON users.id = users_languages.user_id
INNER JOIN language ON users_languages.language_id = language.id;


-- ⬇️INSERTS⬇️

-- SEGUIR USUARIOS
INSERT INTO follow_users (user_id, followed_user_id, created_at) VALUES (1, 2, CURRENT_TIMESTAMP);

--CREAR UNA NOTIFICACION
INSERT INTO notifications (user_id, notification, created_at) VALUES (1, "El usuario 1 ha dao like a tu comentario", CURRENT_TIMESTAMP);

--DEJAR DE SEGUIR USUARIOS
DELETE FROM follow_users WHERE user_id = 1 AND followed_user_id = 2;

--COMPARTIR POSTS
INSERT INTO SHARED_POSTS (id_post, user_id, comment, created_at) VALUES (1, 2, "coampartodo 1", CURRENT_TIMESTAMP);

-- CREAR UN USUARIO
INSERT INTO users (name, email, password, created_at) VALUES ("andres", "andres@gmail.com", "123456", CURRENT_DATE);

--INSERTAR LOS POSTS
INSERT INTO posts (title, code, id_language, image, created_at, updated_at, author_id) VALUES ("Hello World", "console.log('Hello World')", 2, "https://res.cloudinary.com/drsdz7hde/image/upload/v1725058393143/user-profile-icon-free-vector_lij3vx.jpg", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2);

--ELIMINAR POSTS
DELETE FROM posts WHERE id = 1;

--INSERTAR LOS COMENTARIOS
INSERT INTO coments (post_id, user_id, comment, created_at) VALUES (1, 1, "Comentario 1", CURRENT_TIMESTAMP);

--ELIMINAR COMENTARIOS
DELETE FROM coments WHERE id = 1;

--INSERTAR LOS LENGUAJES QUE PODRAN ELEJIR LOS USARIOS
INSERT INTO language (name) VALUES ("Python");

INSERT INTO language (name) VALUES ("JavaScript");

INSERT INTO language (name) VALUES ("Java");

INSERT INTO language (name) VALUES ("C++");

INSERT INTO language (name) VALUES ("C#");

INSERT INTO language (name) VALUES ("Ruby");

INSERT INTO language (name) VALUES ("PHP");

INSERT INTO language (name) VALUES ("Swift");

INSERT INTO language (name) VALUES ("Go");

INSERT INTO language (name) VALUES ("Kotlin");

INSERT INTO language (name) VALUES ("R");

INSERT INTO language (name) VALUES ("TypeScript");

INSERT INTO language (name) VALUES ("Perl");

INSERT INTO language (name) VALUES ("Scala");

INSERT INTO language (name) VALUES ("Rust");

INSERT INTO language (name) VALUES ("Dart");

INSERT INTO language (name) VALUES ("SQL");

INSERT INTO language (name) VALUES ("MATLAB");

INSERT INTO language (name) VALUES ("Objective-C");

INSERT INTO language (name) VALUES ("Shell");

INSERT INTO language (name) VALUES ("Haskell");

INSERT INTO language (name) VALUES ("Lua");

INSERT INTO language (name) VALUES ("Elixir");

INSERT INTO language (name) VALUES ("Erlang");

INSERT INTO language (name) VALUES ("Groovy");

INSERT INTO language (name) VALUES ("Julia");

INSERT INTO language (name) VALUES ("Visual Basic");

INSERT INTO language (name) VALUES ("Fortran");

INSERT INTO language (name) VALUES ("COBOL");

INSERT INTO language (name) VALUES ("F#");

INSERT INTO language (name) VALUES ("Pascal");

INSERT INTO language (name) VALUES ("VHDL");

INSERT INTO language (name) VALUES ("Ada");

INSERT INTO language (name) VALUES ("Assembly");

INSERT INTO language (name) VALUES ("Prolog");

INSERT INTO language (name) VALUES ("Clojure");

INSERT INTO language (name) VALUES ("Scheme");

INSERT INTO language (name) VALUES ("Tcl");

INSERT INTO language (name) VALUES ("SAS");

INSERT INTO language (name) VALUES ("ABAP");

INSERT INTO language (name) VALUES ("Lisp");

INSERT INTO language (name) VALUES ("Delphi");

INSERT INTO language (name) VALUES ("PL/SQL");

INSERT INTO language (name) VALUES ("ColdFusion");

INSERT INTO language (name) VALUES ("ActionScript");

INSERT INTO language (name) VALUES ("Smalltalk");

INSERT INTO language (name) VALUES ("LabVIEW");

INSERT INTO language (name) VALUES ("RPG");

INSERT INTO language (name) VALUES ("Bash");

INSERT INTO language (name) VALUES ("Zig");

INSERT INTO language (name) VALUES ("Crystal");

INSERT INTO language (name) VALUES ("Nim");

INSERT INTO language (name) VALUES ("OCaml");

INSERT INTO language (name) VALUES ("Verilog");

INSERT INTO language (name) VALUES ("Awk");

INSERT INTO language (name) VALUES ("Sed");

INSERT INTO language (name) VALUES ("PostScript");

INSERT INTO language (name) VALUES ("Forth");

INSERT INTO language (name) VALUES ("Modula-2");

INSERT INTO language (name) VALUES ("ALGOL");

INSERT INTO language (name) VALUES ("Simula");

INSERT INTO language (name) VALUES ("MUMPS");

INSERT INTO language (name) VALUES ("GAMS");

INSERT INTO language (name) VALUES ("Icon");

INSERT INTO language (name) VALUES ("REXX");

INSERT INTO language (name) VALUES ("Racket");

INSERT INTO language (name) VALUES ("Io");

INSERT INTO language (name) VALUES ("Miranda");

INSERT INTO language (name) VALUES ("ML");

INSERT INTO language (name) VALUES ("Eiffel");

INSERT INTO language (name) VALUES ("Rexx");

INSERT INTO language (name) VALUES ("Scratch");

INSERT INTO language (name) VALUES ("Hack");

INSERT INTO language (name) VALUES ("PureScript");

INSERT INTO language (name) VALUES ("Vala");

INSERT INTO language (name) VALUES ("CoffeeScript");

INSERT INTO language (name) VALUES ("Wolfram");

INSERT INTO language (name) VALUES ("VHDL");

INSERT INTO language (name) VALUES ("QML");

INSERT INTO language (name) VALUES ("Max/MSP");

INSERT INTO language (name) VALUES ("Pike");

INSERT INTO language (name) VALUES ("XQuery");

INSERT INTO language (name) VALUES ("XSLT");

INSERT INTO language (name) VALUES ("Solidity");

INSERT INTO language (name) VALUES ("Vyper");

INSERT INTO language (name) VALUES ("Pony");

INSERT INTO language (name) VALUES ("WebAssembly");

INSERT INTO language (name) VALUES ("Chapel");

INSERT INTO language (name) VALUES ("Golo");

INSERT INTO language (name) VALUES ("Logtalk");

INSERT INTO language (name) VALUES ("Mercury");

INSERT INTO language (name) VALUES ("Neko");

INSERT INTO language (name) VALUES ("OpenCL");

INSERT INTO language (name) VALUES ("Oz");

INSERT INTO language (name) VALUES ("Red");

INSERT INTO language (name) VALUES ("Ring");

INSERT INTO language (name) VALUES ("Turing");

INSERT INTO language (name) VALUES ("Yorick");

INSERT INTO language (name) VALUES ("Zsh");

INSERT INTO language (name) VALUES ("ZPL");

INSERT INTO language (name) VALUES ("REBOL");

INSERT INTO language (name) VALUES ("Self");

INSERT INTO language (name) VALUES ("Factor");

INSERT INTO language (name) VALUES ("Fantom");

INSERT INTO language (name) VALUES ("Janus");

INSERT INTO language (name) VALUES ("J");

INSERT INTO language (name) VALUES ("K");

INSERT INTO language (name) VALUES ("APL");

INSERT INTO language (name) VALUES ("Ballerina");

INSERT INTO language (name) VALUES ("E");

INSERT INTO language (name) VALUES ("Euphoria");

INSERT INTO language (name) VALUES ("Fantom");

INSERT INTO language (name) VALUES ("FScript");

INSERT INTO language (name) VALUES ("Io");

INSERT INTO language (name) VALUES ("Joy");

INSERT INTO language (name) VALUES ("KornShell");

INSERT INTO language (name) VALUES ("Mathematica");

INSERT INTO language (name) VALUES ("MaxScript");

INSERT INTO language (name) VALUES ("Mercury");

INSERT INTO language (name) VALUES ("Modula-3");

INSERT INTO language (name) VALUES ("MQL4");

INSERT INTO language (name) VALUES ("MQL5");

INSERT INTO language (name) VALUES ("Nimrod");

INSERT INTO language (name) VALUES ("Oberon");

INSERT INTO language (name) VALUES ("Occam");

INSERT INTO language (name) VALUES ("Oz");

INSERT INTO language (name) VALUES ("Piet");

INSERT INTO language (name) VALUES ("PostScript");

INSERT INTO language (name) VALUES ("Rebol");

INSERT INTO language (name) VALUES ("Sather");

INSERT INTO language (name) VALUES ("Seed7");

INSERT INTO language (name) VALUES ("Spin");

INSERT INTO language (name) VALUES ("SPARK");

INSERT INTO language (name) VALUES ("SPSS");

INSERT INTO language (name) VALUES ("Squirrel");

INSERT INTO language (name) VALUES ("Standard ML");

INSERT INTO language (name) VALUES ("SuperCollider");

INSERT INTO language (name) VALUES ("Tcl/Tk");

INSERT INTO language (name) VALUES ("UnrealScript");

INSERT INTO language (name) VALUES ("Vimscript");

INSERT INTO language (name) VALUES ("Whitespace");

INSERT INTO language (name) VALUES ("Xtend");

INSERT INTO language (name) VALUES ("ZPL");



