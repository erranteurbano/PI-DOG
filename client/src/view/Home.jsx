import React from 'react'
import { connect } from 'react-redux'
import Card from '../componet/Cards/Cards'
import Filter from '../componet/Filter/Filter'
import style from '../style/Home.module.css'

function Home({Dogs,temperaments}) {
  return (
    <div className={style.container}>
        <div className={style.rigth}><Filter temperaments={temperaments}/></div>
        <div className={style.left}><Card Dogs={Dogs}/></div>
    </div>
  )
}

const mapStateToProps = state => ({
  Dogs: state.Dogs,
});

export default connect(mapStateToProps)(Home);