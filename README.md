cd frontend/

then
> npm install
> gulp dev   //using dev task you get injected unminified list of js files in your html



All sources are in src/ and this is the only folder to work with.
Generated html, css, imgs and js are in dist/
In public u can find genearted htmls, packed and minified js, css and images for production.

before git push
> gulp prod    //using prod task you get injected minified js file in your html


and veryfy.
