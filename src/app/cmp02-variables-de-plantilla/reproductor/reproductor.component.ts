import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  constructor() { }

  // @ViewChild('video') videoElem: any;
  @ViewChild('video') videoElem!: ElementRef;
  currentVolume: number = 50
  currentTime: number = 0
  duration: number = 0

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.videoElem.nativeElement.volume = this.currentVolume / 100
    //  this.videoElem.nativeElement.play()
  }

  play(video: HTMLVideoElement): void{
    console.dir(video) //el console log nos devolvía directamente la etiqueta.
    video.play()
  }

  pause(video: HTMLVideoElement): void{
   video.pause()
  }

  cambiarVolumen(video: HTMLVideoElement, event: any): void{
    const volumenInput = Number(event.target.value)
    this.currentVolume = volumenInput
    video.volume = volumenInput / 100
  }

  fullScreen(video: HTMLVideoElement): void{
    video.requestFullscreen()
  }

  replay(video: HTMLVideoElement): void{
    console.dir(video)
    video.currentTime = 0
  }

  mute(video: HTMLVideoElement): void{
    video.volume =  0
    this.currentVolume = 0
  }

  subirVolumen(): void{
    if (this.currentVolume + 10 <= 100){
      this.videoElem.nativeElement.volume += 0.1
      this.currentVolume += 10
    }else{
      this.videoElem.nativeElement.volume = 1
      this.currentVolume = 100
    }
  }

  bajarVolumen(): void{
    if (this.currentVolume - 10 >= 0){
      this.videoElem.nativeElement.volume -= 0.1
      this.currentVolume -= 0
    }else{
      this.videoElem.nativeElement.volume = 0
      this.currentVolume = 0
    }
  }

  retroceder(): void{
    
  }

  actualizarProgreso(event: any): void{
    console.log(event)
    this.currentTime = event.target.currentTime
  }

  setDuration(){
    this.duration = this.videoElem.nativeElement.duration
    console.log(this.duration)
  }

  getDuration(video: HTMLVideoElement): number{
    return video.duration || 0 
  }



}
