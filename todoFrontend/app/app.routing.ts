import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TaskComponent } from './products/task.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: TaskComponent },
            //{ path: '', component: ProductComponent },
            { path: '**', redirectTo: '', pathMatch: 'full' }
        ] , { preloadingStrategy: PreloadAllModules })
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }