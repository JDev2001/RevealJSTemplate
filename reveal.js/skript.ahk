!n::
	FormatTime, TimeString,, HHmmsddMMyyyy
	Path =  C:\Users\entep05\AppData\Local\Temp%TimeString%
	FileCreateDir, %Path%
	Run, %Path%
	return


