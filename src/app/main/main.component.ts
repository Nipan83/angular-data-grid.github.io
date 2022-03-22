import { Component, OnInit } from '@angular/core';
import {Sort} from '@angular/material/sort';
import * as saveAs from 'file-saver';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  rows = [];
  columns = [];
  message = "";
  selectedRow = null;
  processClicked = false;
  label2 = ""
  label3 = ""
  label4 = ""

  constructor() { }

  displayMessage(){
    let elem = document.getElementById('modal');
    elem.classList.add('block');
  }

  closeMessage(){
    let elem = document.getElementById('modal');
    elem.classList.remove('block');
  }

  process(){
    this.processClicked = true;
    this.message = null;
    this.selectedRow = null;
    this.displayMessage();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  handleOnClickBtn121(){
    this.message = "Button_121 Pressed."
    this.selectedRow = null;
    this.processClicked = false;
    this.displayMessage();
  }

  doubleClickRow(row,i){
    
    let id = `tr-${i}`;
    let elem = document.getElementById(id);
    elem.classList.add('selected-tr');

    let elems = document.getElementsByClassName('selected-tr');
    let len = elems.length ?? 0;


    this.processClicked = false;
    
    if(len == 1){
      console.log(row)
      this.selectedRow = row;
      this.message = null;
      this.displayMessage();
    }
    else{
      console.log(row)
      console.log(elems)
      console.log(elems.length)
      let data = "";
      for(let i=0;i<elems.length;i++){
          let row = elems[i];
          let txt = (row as HTMLElement).innerText.split('\t').join(',');
          data+=txt+'\n';
      }

      console.log(data)

      let file = new Blob([data], { type: 'text/csv;charset=utf-8' });
      saveAs(file, 'SAMPLE_OUTPUT.txt')

    }
  }

  clickRow(row,i){

    let id = `tr-${i}`;
    let elem = document.getElementById(id);
    if(elem.classList.contains('selected-tr')){
      elem.classList.remove('selected-tr');
    }
    else {
      elem.classList.add('selected-tr');
    }
  }

  sortData(sort: Sort) {
    const data = this.rows.slice();
    if (!sort.active || sort.direction === '') {
      this.rows = data;
      return;
    }

    this.rows = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      let col = sort.active;
      return this.compare(a[col],b[col],isAsc);
    })
  }

  getTrClass(row){
    let first_col = this.columns[0];
    let val = row[first_col];
    let indx = val.substring(val.length-1);
    if(indx == 0) return "red-b";
    if(indx == 1) return "green-b";
    if(indx == 2) return "blue-b";
    return;
  }

  formatData(data){
      this.rows = [];
      this.columns = ['COLUMN_0','COLUMN_1','COLUMN_2','COLUMN_3','COLUMN_4'];

      for(let i=0;i<data.length;i++){
          let row = data[i].split(',');
          let obj = {};
          for(let j=0;j<this.columns.length;j++){
            obj[this.columns[j]] = row[j];
          }
          this.rows.push(obj);
      }
  }

  loadInputData(){
    
    fetch('assets/SAMPLE_INPUT.txt').then(response => response.text()).then(data => {
        let res = data.split(/\r?\n/);
        this.formatData(res);
    });

  }

  ngOnInit(): void {
      this.loadInputData();
  }

}
