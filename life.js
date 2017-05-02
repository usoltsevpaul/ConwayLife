$(function() {
    var text = "";
    for (var i = 0; i < 4; i++) {
        text += "<tr>";
        for (var j = 0; j < 4; j++) {
            text += "<td><img class=\"octagon\" src=\"assets/Mesh-100.png\" /></td>";
        }
        text += "<\tr>";
    }
    console.log(text);
    document.getElementById("table").innerHTML = text;
})