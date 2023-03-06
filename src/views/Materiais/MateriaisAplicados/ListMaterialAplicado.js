import React from "react";
import ObjectList from "../../../components/GenericList/ObjectList";
import usePagination from "../../../hooks/usePagination";
import MaterialAplicadoService from "../../../services/materiais/MaterialAplicadoService";

const MateriaisAplicados = () => {
  const [data, setData] = React.useState({});
  const [responseTable, setResponseTable] = React.useState([]);
  const pagination = usePagination();

  const handleAlterSerial = async (id) => {
    let resp = await MaterialAplicadoService.alterSerial(id);
    if (resp.status === 200) {
      return true;
    }
  };

  const handleDelete = async (event) => {
    MaterialAplicadoService.delete(event.currentTarget.id).then((resp) => {
      if (resp.status == 200) {
        window.alert("Excluido com sucesso");
        getAll();
      }
    });
  };

  const getAll = async () => {
    MaterialAplicadoService.getAll(pagination).then((resp) => {
      setData(resp);
    });
  };

  const cabecalho = [
    {
      column: "id",
      oculto: true,
    },
    {
      column: "Materiais",
    },
    {
      column: "id senior",
    },
    {
      column: "serial",
      tipo: "checkbox",
      funcao: handleAlterSerial,
    },
    {
      column: "Excluir",
      tipo: "delete",
      funcao: handleDelete,
    },
  ];

  React.useEffect(() => {
    let array = {};
    array.number = data.number;
    array.last = data.last;
    array.first = data.first;
    array.totalPages = data.totalPages;
    if (data.content != undefined && data.content.length > 0) {
      array.content = [];
      data.content.forEach((x) => {
        array.content.push({
          id_redirect: x.id,
          material: x.material,
          id_senior: x.id_senior,
          has_serial: x.has_serial,
          id: x.id,
        });
      });
      setResponseTable(array);
    }
  }, [data]);

  React.useEffect(() => {
    getAll();
  }, [pagination.page, pagination.size, pagination.search]);

  return (
    <>
      <ObjectList
        searchEnabled={true}
        addNewEnabled={true}
        objectHeader={cabecalho}
        objectArray={responseTable}
        objectPagination={pagination}
        redirect={true}
      />
    </>
  );
};

export default MateriaisAplicados;
