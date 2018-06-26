# Calendar App

Currently, supposing the month is Feb 2015 as this was the last February that started on Sunday

> An issue faced with this project was rerendering component; as react only does shallow comprarision I had to spend time looking how to force react to do deep comparision

> Back-end database became complicated for `PUT` requests; I started updating the store in reducer. One way to uncomplicate this process is to call `GET` method after updating so we get the new store with manupulations done on the back-end rather on the store so out store is updated with the updated event value from the back-end