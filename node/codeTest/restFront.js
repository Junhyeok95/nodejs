function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status === 200){
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('list');
            list.innerHTML = '';
            Object.keys(users).map(function(key){
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                span.textContent = users[key];
                var edit = document.createElement('button');
                edit.textContent = 'update';
                // on 또는 addListener 은 할 수 없다
                edit.addEventListener('click', function(){
                    var name = prompt('new name input');
                    if (!name){
                        return alert('name input !!');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if (xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser(); // self func
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PUT', '/users/'+key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({name:name}));
                });
                var remove = document.createElement('button');
                remove.textContent = 'delete';
                remove.addEventListener('click', function(){
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if (xhr.status === 200){
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE', '/users/'+key);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('GET', '/users');
    xhr.send();
}

window.onload = getUser; // start getUser !!

document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault(); // 이벤트 고유 동작을 취소한다 ... stopPropagation 는 상위 속성으로의 이벤트 전파를 중단
    // 왜냐하면 page reload stop 하려고
    var name = e.target.username.value;
    if (!name){
        return alert('name input');
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if (xhr.status === 201){
            console.log(xhr.responseText);
            getUser();
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({name:name}));
    e.target.username.value = ''; // claer
})