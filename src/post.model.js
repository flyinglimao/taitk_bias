class Post {
    constructor ( id, title, content, category ) {
        this.id = id
        this.title = title
        this.content = content
        this.category = category
    }
}

class PostService {
    static $http

    static init($http) {
        this.$http = $http
    }

    static getIndex() {
        return this.$http.get('https://taitk.org/api/bias')
    }

    static getPost ( id ) {
        return this.$http.get('https://taitk.org/api/bias/' + id)
    }

    static saveMarked ( id, marks ) {
        let data = []
        marks.forEach((mark, idx) => {
            mark.forEach(set => {
                data.push({
                    type: idx,
                    start: set[0],
                    end: set[1]
                })
            })
        })

        return this.$http.patch('https://taitk.org/api/bias/' + id, {data})
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

}

export {
    Post, PostService
}