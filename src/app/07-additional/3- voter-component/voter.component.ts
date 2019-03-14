
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'voter',
    template: `
    <div class="voter">
        <i 
            class="glyphicon glyphicon-menu-up vote-button"
            [class.highlighted]="myVote == 1" 
            (click)="upVote()"></i>
            
        <span class="vote-count">{{ totalVotes }}</span>
        
        <i 
            class="glyphicon glyphicon-menu-down vote-button"
            [class.highlighted]="myVote == -1" 
            (click)="downVote()"></i>
    </div>
    `,
    styles: [`
        .voter {
            width: 20px;
            text-align: center;
            color: #999;
        }
        
        .vote-count {
            font-size: 1.2em;
        }
        
        .vote-button {
            cursor: pointer;
        }
        
        .highlighted {
            font-weight: bold;
            color: orange;
        }
    `]
})
export class VoterComponent {
    @Input() othersVote = 0;
    @Input() myVote = 0;
    
    @Output() myVoteChanged = new EventEmitter();
    
    upVote(){
        if (this.myVote == 1)
            return;
        
        this.myVote++;

        this.myVoteChanged.emit({ myVote: this.myVote });
    }
    
    downVote(){
        if (this.myVote == -1)
            return;
            
        this.myVote--;
        
        this.myVoteChanged.emit({ myVote: this.myVote });
    }

    get totalVotes(): number { 
      return this.othersVote + this.myVote;
    }
}