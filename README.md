This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


A slug with a `/` passed to getStaticPaths parameter will not generate correctly and is marked as `router.isFallback` despite it being generated in the first place. But it will not throw an error during the staticProps lifecycle. 
Subsequently this also means that the ASCII encoding for `/` which is `%2F` is treated seperately from `/` when they should be treated as the same page. 

<img width="306" alt="image" src="https://github.com/isaac-martin/static-paths/assets/8649366/f45513bd-7e99-45ed-96b9-84d3e10b1a75">

This is somewhat called out in the docs https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments however i think that when next encounters a catch all segment that includes a `/` inside it - error on the build, or apply a `sement.split('/')` and spread the result of this into the array of segments. 

subsequently the `/` and `%2F` should be treated the same - as it is currently you could in theory generate two seperate pages for these when they should error / be the same

