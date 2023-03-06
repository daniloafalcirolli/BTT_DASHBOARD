import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />
  },
  {
    title: 'Funcionários',
    path: '/funcionarios',
    icon: <BsIcons.BsPeopleFill />
  },
  {
    title: 'Usuários',
    path: '/users',
    icon: <FaIcons.FaUserCog />
  },
  {
    title: 'Cidades',
    path: '/cidades',
    icon: <FaIcons.FaMap />,
  },
  {
    title: 'Empresas',
    path: '/empresas',
    icon: <FaIcons.FaBalanceScale />,
  },
  {
    title: 'Status funcionários',
    path: '/status/funcionario',
    icon: <FaIcons.FaClipboardCheck />
  },
  {
    title: 'Materiais',
    path: '/materiais',
    icon: <FaIcons.FaBoxes />,
    subNav: [
      {
        title: 'Materiais aplicados',
        path: '/materiais/aplicados',
        cName: 'sub-nav'
      },
      {
        title: 'Materiais retirados',
        path: '/materiais/retirados',
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Provedores',
    path: '/provedores',
    icon: <BiIcons.BiBuildingHouse />,
    subNav: [
      {
        title: 'Bases',
        path: '/provedores/bases',
      },
      {
        title: 'Campos',
        path: '/provedores/campos',
      },
      {
        title: 'Categorias de serviço',
        path: '/provedores/categorias-servico'
      },
      {
        title: "Fotos",
        path: '/provedores/fotos'
      }
    ]
  },
  {
    title: 'Relatórios',
    path: '/relatorios',
    icon: <FaIcons.FaClipboardList />
  },
  {
    title: "Parametrizações",
    path: "/parametrizacoes",
    icon: <AiIcons.AiFillTool />
  },
  {
    title: 'Configurações',
    path: '/configuracoes',
    icon: <FaIcons.FaCog />
  }
];