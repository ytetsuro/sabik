ASSETS	=	Reporter/HTML/FrontEnd

all:	clean build	;

clean:
	rm -rf ./lib

build:	./src
	./node_modules/.bin/tsc -b \
  && cp -rp src/$(ASSETS) lib/$(ASSETS)

