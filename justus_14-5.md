# Bookmarks ophalen

app.get('/leeslijst', function (request, response)
    let leeslijstUrl = `${apiurl}oba_bookmarks?fields=*.*`

    fetchJson(leesLijstFetch)
        .then({ data }) => {
            return data.map((bookmark) => {
                return bookmark.item
            })
            .then((itemsOpLeeslijst) => {
                response.send(itemsOpLeeslijst)
            })
    })


app.post('/detail/:id', function (request, response)
    const id = request.params.id

    fetch('${apiUrl}oba_bookmarks', {
    method: 'POST'
    body: JSON.stringify({
        item: request.params.id,
    }),
    headers: {
        'Content-type': 'application/json: charset=UTF-8',
    },
    }).then((postResponse) => {
        console.log(postResponse)
        response.redirect(303, '/detail/' +id + '?added=true' )
    })

app.delete('/detail/:id', function (request, response)
    const id = request.params.id

    fetch('${apiUrl}oba_bookmarks'/${id}, {
    method: 'DELETE',
    })
    headers: {
        'Content-type': 'application/json: charset=UTF-8',
    },
    }).then((postResponse) => {
        console.log(postResponse)
        response.redirect(303, '/detail/' + id + '?deleted=true' )
    })





    <% if(user.data.linked_item && user.data.linked_item.length > 0) { %> 
        <ul class="item_list">
            <% user.data.linked_item.forEach(item => { %> 
                <li><%= item.oba_item_id.title %></li> 
            <% }); %>
        </ul>
    <% } else { %>
        <p>Er wordt momenteel niks geleend!</p>
    <% } %>