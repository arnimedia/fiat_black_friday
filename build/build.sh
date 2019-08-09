echo "BUILDING BANNERS..."

#uncomment the banners you want to build for production

grunt build --set=formats --format=300x250 --cta=fm
grunt build --set=formats --format=300x600 --cta=fm
grunt build --set=formats --format=728x90 --cta=fm

echo "BUILD COMPLETE"
