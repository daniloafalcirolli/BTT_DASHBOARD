import React from 'react'
import RelatorioCombustivel from './ComponentesRelatorio/RelatorioCombustivel'
import RelatorioHub from './ComponentesRelatorio/RelatorioHub'
import RelatorioRotaIndividual from './ComponentesRelatorio/RelatorioRotaIndividual'
import RelatorioServicos from './ComponentesRelatorio/RelatorioServicos'

const Relatorios = () => {
    const [page, setPage] = React.useState(0);

    React.useEffect(() => {
        setPage(JSON.parse(window.localStorage.getItem('pageRelatorio')));
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem('pageRelatorio', page);
    }, [page])

    const renderPage = () => {
        switch (page) {
            case 0:
                return (<><p>Selecione um relatório</p></>);
            case 1:
                return (<RelatorioServicos />);
            case 2:
                return (<RelatorioCombustivel />);
            case 3:
                return (<RelatorioRotaIndividual />);
            default:
                return (<><p>Selecione um relatório</p></>);
        }
    }
    return (
        <>
            <RelatorioHub page={setPage} />
            { renderPage() }
        </>
    )
}

export default Relatorios