cd ~/code/angular/library
ng build --prod
if [ $? -eq 0 ]; then
    cd ~/code/angular/library/dist/library
    aws s3 sync . s3://l.mymisc.info
else
    echo "Compilation failed."
fi