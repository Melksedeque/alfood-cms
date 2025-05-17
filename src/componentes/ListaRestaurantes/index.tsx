import axios from 'axios';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurantes, steRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState<string | null>('');

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina!)
     .then(resposta => {
        steRestaurantes([...restaurantes, ...resposta.data.results])
        setProximaPagina(resposta.data.next)
      })
     .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    document.title = 'Restaurantes'
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(resposta => {
        steRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {proximaPagina && <button onClick={() => {verMais()}}>Carregar mais</button>}
  </section>)
}

export default ListaRestaurantes