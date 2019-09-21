let ratings = [];

window.onload = function getRatings () {
    db.collection('ratings').get().then( snapshot => {
        snapshot.forEach( rating => {
            ratings.push({title: rating._document.proto.fields.title.stringValue,
                        body: rating._document.proto.fields.body.stringValue,
                        timestamp: rating._document.proto.fields.timestamp.timestampValue,
            });
        })
    } ).then( () => {
        const ratingDiv = document.getElementById('ratings');
        let html = '';
        ratings.forEach( (rating , index) => {
            const div = `
                <div id="ratingDiv" >
                    <h1 id="ratingTitle" >${rating.title}</h1>
                    <h3 id="ratingBody" > ${rating.body} </h3>
                </div>
            `;
            html += div;
        } );
        ratingDiv.innerHTML = html;
    })
} 
