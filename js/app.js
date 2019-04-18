// Login
    var provider = new firebase.auth.GoogleAuthProvider();

    $('#login').click(function(){
        firebase.auth().signInWithPopup(provider).then(function(result){
            console.log(result.user);
            saveInformation(result.user);
            $('#login').hide();
            $('#root').append("<img class='image' src='" + result.user.photoURL + "'> <p class='alert'> - Thanks for signing up <i class='fas fa-heart'></i></p>");
        });
    });

// Esta función almacena los datos automaticamente
    function saveInformation(user){
        var user1 = {
            uid: user.uid,
            nombre: user.displayName,
            email: user.email,
            foto: user.photoURL
        }
        console.log(user1);
        firebase.database().ref("appUser/" + user.uid).set(user1)
    }

// Escribir en la base de datos
    $("#save").click(function(){
        firebase.database().ref("appUser").set({
            nombre: "Satanas",
            edad: "15",
            sexo: "Woman"
        })
    });

// Leyemos de base de datos
    firebase.database().ref("appUser").on("child_added", function(s){
        var user = s.val();
        $('#root').append("<img class='image' src='" + user.foto + "'> <p>"+ user.email +"</p>");
    });