import Sentence from './Sentence'

export default {
    name: 'SentenceList',
    props: {
        content: null,
        marks: null,
        show: null,
        colorSet: null,
    },
    components: {
        Sentence
    },
    render(createElement) {
        let set = []
        let children = []
        this.marks.forEach((subset, idx) => {
            if (!this.show[idx]) return
            subset.forEach(pair => {
                set.push({
                    color: this.colorSet[idx],
                    del: () => subset.splice(subset.indexOf(pair), 1),
                    head: pair[0],
                    tail: pair[1]
                })
            })
        })

        set.sort((a, b) => a.head > b.head)

        set.forEach(sentence => {
            children.push(createElement('Sentence', {
                props: {
                    color: sentence.color,
                    del: sentence.del
                }
            }, this.content.slice(sentence.head, sentence.tail)))
        })

        return createElement('div', {}, children)
    }
}