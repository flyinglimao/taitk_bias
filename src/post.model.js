class Post {
    constructor ( id, title, content ) {
        this.id = id
        this.title = title
        this.content = content
    }
}

class Category {
    constructor ( id, name, child ) {
        this.id = id
        this.name = name
        this.child = child
    }
}

class PostService {
    
    static _post = new Post(0, 'Example Post', `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum ante mi, in suscipit turpis pulvinar eget. Cras facilisis felis id lorem tempus, nec blandit mauris viverra. Aenean molestie at dui at maximus. Nullam rhoncus lacus sed nunc convallis porttitor. Duis commodo eros quis lacus bibendum, nec tristique arcu imperdiet. Proin pretium ligula massa, ut cursus lorem fermentum in. Praesent eget leo bibendum, vehicula lacus a, luctus erat. Maecenas finibus vulputate tortor a imperdiet. Pellentesque efficitur faucibus nisi, nec lobortis lacus viverra ac.

    Praesent sit amet euismod erat, id bibendum augue. Morbi ultricies risus ac augue condimentum egestas. Vivamus porta quis nisi non maximus. Donec porta dolor sit amet diam finibus hendrerit. Ut et dignissim neque. Praesent in leo viverra, tempus lorem et, viverra felis. Suspendisse semper tempus nisl, eget vulputate quam hendrerit eu. Quisque eget lacus faucibus tellus sodales hendrerit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam suscipit justo a neque porttitor tincidunt. Sed finibus diam at tempus auctor. Donec interdum malesuada sem sed sollicitudin. Sed magna nisi, malesuada quis accumsan id, dapibus sit amet orci. Duis interdum fringilla ex ut cursus.`)

    static getPosts () {
        return {
            'Default': [this._post]
        }
    }

    static getCategories () {
        return ['Default']
    }

    static getPost ( id ) {
        if (id === 0) {
            return this._post
        } else {
            return null
        }
    }

    static getCategory ( id ) {
        if (id === 0)
            return [0]
        else
            return []
    }

    static search ( title ) {
        if ('Example Post'.indexOf(title)) 
            return this._post
        else
            return null
    }

    static fullTextSearch ( content ) {
        if (JSON.stringify(this._post).indexOf(content))
            return this._post
        else
            return null
    }

    static update ( id, content ) {
        if (id === 0)
            this._post.content = content
        else
            throw Error('Post not exist')
    }

}

export {
    Post, Category, PostService
}