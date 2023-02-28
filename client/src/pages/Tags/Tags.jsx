import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import './Tags.css'

const Tags = () => {

    const tagsList = [
      {
        id: 1,
        tagName: "javascript",
        tagDesc:
          "For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Keep in mind that JavaScript is NOT the same as...",
      },
      {
        id: 2,
        tagName: "python",
        tagDesc:
          "Python is a multi-paradigm, dynamically typed, multi-purpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax. Please...",
      },
      {
        id: 3,
        tagName: "java",
        tagDesc:
          "Java is a high-level object-oriented programming language. Use this tag when you're having problems using or understanding the language itself. This tag is frequently used alongside other tags for lib…",
      },
      {
        id: 4,
        tagName: "c#",
        tagDesc:
          "C# (pronounced 'see sharp') is a high-level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-",
      },
      {
        id: 5,
        tagName: "php",
        tagDesc:
          "PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting language designed initially for server-side web development. Use this tag for questions …",
      },
      {
        id: 6,
        tagName: "android",
        tagDesc:
          "Android is Google's mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT). For topics related to Android, use...",
      },
      {
        id: 7,
        tagName: "html",
        tagDesc:
          "HTML (HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web browser. Questions regarding HTML should include a minimal...",
      },
      {
        id: 8,
        tagName: "jquery",
        tagDesc:
          "jQuery is a JavaScript library. Consider also adding the JavaScript tag. jQuery is a popular cross-browser JavaScript library that facilitates Document Object Model (DOM) traversal, event handling…",
      },
      {
        id: 9,
        tagName: "c++",
        tagDesc:
          "C++ is a general-purpose programming language. Initially, it was designed as an extension to C and has a similar syntax, but it is now a completely different language. Use this tag for questions...",
      },
      {
        id: 10,
        tagName: "ios",
        tagDesc:
          "iOS is the mobile operating system running on the Apple iPhone, iPod touch, and iPad. Use this tag [ios] for questions related to programming on the iOS platform. Use the related tags [objective-c] an…",
      },
      {
        id: 11,
        tagName: "mysql",
        tagDesc:
          "MySQL is a free, open-source Relational Database Management System (RDBMS) that uses Structured Query Language (SQL). DO NOT USE this tag for other DBs such as SQL Server, SQLite etc. Those are...",
      },
      {
        id: 12,
        tagName: "sql",
        tagDesc:
          "Structured Query Language (SQL) is a language for querying databases. Questions should include code examples, table structure, sample data, and a tag for the DBMS implementation (e.g. MySQL, PostgreSQ…",
      },
      {
        id: 13,
        tagName: "reactjs",
        tagDesc:
          "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be efficient and flexible.",
      },
      {
        id: 14,
        tagName: "asp.net",
        tagDesc:
          "ASP.NET is a Microsoft web application development framework that allows programmers to build dynamic web sites, web applications and web services. It is useful to use this tag in...",
      },
    ];


  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1 className="tags-h1">Tags</h1>
        <p className="tags-p">
          A tag is a keyword that categorizes your question with other, similar
          questions.
        </p>
        <p className="tags-p">
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
        <div className="tags-list-container">
          {tagsList.map((tag) => (
            <TagsList tag={tag} key={tagsList.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tags
