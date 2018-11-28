function getUserById(id){
    const params = {
        access_token: '',
        q: id,
        fields: 'photo_big'

    };
    //users.get

    return $.ajax({
        url: 'https://api.vk.com/method/users.search?' + $.param(params) + '&v=5.52',
        type: 'GET',
        dataType: 'JSONP'
    }).promise();
}

Rx.Observable.fromEvent($('input'), 'keyup')
.pluck('target', 'value')
.distinct()
.debounceTime(2000)
.mergeMap(v=> Rx.Observable.fromPromise(getUserById(v)))
.map( x => x.response)
.catch(error => Rx.Observable.of(error))
.subscribe(
    (users) => {
        console.log('user', users);
        document.getElementById('content').innerHTML="";
$('#content').html(`<h1>Количество пользователей: <span>${users.count}</span></h1> `);
        users.items.forEach((user) => {
            var div = document.createElement("div");
                div.className ='profile_card';
           div.innerHTML = `<a href="https://vk.com/id${user.id}" target="_blank">
           <h2>${user.first_name} ${user.last_name} </h2>
           <div style="background: url(${user.photo_big})"></div>
           <p>ID: ${user.id}</p>
           </a>
           `;
            document.getElementById('content').appendChild(div);
        
         
        })
     
       
    },
    error => {

    },
    () => console.log('completed')
  
    )