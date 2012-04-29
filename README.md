#About
An open source Documentation Searching webpage using searchco.de's API
<br>Added Fancybox iframe integration

#Search via url

##the "q" parameter
setting the "q" url parameter to any string, will automatically insert that string in the keyword input and search for it once the page loads. For example: http://docfinder.varemenos.com/?q=explode

##the "lang" parameter
setting the "lang" url parameter to a specific language name, will automatically pick that language from the dropdown menu when the page loads. For example: http://docfinder.varemenos.com/?lang=php

valid options for the lang parameter are:
<ul>
	<li>"all" for All</li>
	<li>"apache" for Apache 2 Directive</li>
	<li>"brainfuck" for BrainFuck</li>
	<li>"closure" for Closure</li>
	<li>"cobol" for Cobol</li>
	<li>"emacs" for Emacs</li>
	<li>"fossil_scm" for Fossil SCM</li>
	<li>"ftp" for FTP Code</li>
	<li>"git" for GIT</li>
	<li>"linux_cmd" for GNU/Linux Command</li>
	<li>"hello_world" for Hello World</li>
	<li>"hresult" for HResult</li>
	<li>"http" for HTTP Code</li>
	<li>"java" for Java</li>
	<li>"javascript" for Javascript</li>
	<li>"jquery" for JQuery</li>
	<li>"linux_kernel_error" for Linux Kernel Error</li>
	<li>"ios" for Mac iOS Reference</li>
	<li>"macos" for Mac OSX Reference</li>
	<li>"mercurial" for Mercurial</li>
	<li>"mysql_error" for MySQL Error</li>
	<li>"mysql" for MySQL Function</li>
	<li>"nginx" for Nginx HttpCoreModule</li>
	<li>"nt_status" for NT Status</li>
	<li>"perl5" for Perl 5</li>
	<li>"perl5_var" for Perl 5 Variable</li>
	<li>"php" for PHP</li>
	<li>"python" for Python</li>
	<li>"python_exception" for Python Exception</li>
	<li>"smarty" for Smarty</li>
	<li>"sql_server_2008" for SQL Server 2008 Function</li>
	<li>"sql_server_2008_error" for SQL Server Error</li>
	<li>"stuntsnippets" for stuntSnippets</li>
	<li>"svn" for SVN</li>
	<li>"underscorejs" for Underscore.js</li>
	<li>"visual_basic_6" for Visual Basic 6</li>
	<li>"win32_error" for Win 32 Error</li>
	<li>"windows_command" for Windows Command</li>
</ul>

##"q" and "lang" parameters (together)
You can use both of them at once for example: http://docfinder.varemenos.com/?lang=php&q=explode