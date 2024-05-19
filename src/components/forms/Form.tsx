export default function Form({ title, children }: { title?: string, children: React.ReactNode }) {

    return (
        <form className="form" onSubmit={e => e.preventDefault()}>
            { title && <h2 className="form__title">{ title }</h2> }
            { children }
        </form>
    );
}