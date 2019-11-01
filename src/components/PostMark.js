export default {
    name: 'PostMark',
    props: {
        marks: null,
        content: null,
        color: null,
    },
    render(createElement) {
        let children = []
        let last = this.content.length
        this.marks.forEach(set => {
            children.push(this.content.slice(set[1], last))
            children.push(createElement('mark', {
                style: {
                    padding: 0,
                    color: 'rgba(0,0,0,0)',
                    background: this.color,
                    'border-bottom': 'none',
                }
            }, [this.content.slice(set[0], set[1])])) 
            last = set[0]
        })
        if (this.marks.length) {
            children.push(this.content.slice(0, this.marks[this.marks.length - 1][0]))
        } else {
            children.push(this.content)
        }
        children.reverse()
        
        return createElement('div', {
            style: `
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                position: absolute;
                color: rgba(0, 0, 0, 0);
                user-select: none;
                z-index: -100;
            `,
        }, [children])
    }
}