import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingListService } from '../../shared/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') slForm: NgForm;
  subscription: Subscription;
  editing = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editing = true;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  submit(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editing) {
      this.slService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.slService.addIngredient(ingredient);
    }
    this.clearForm();
  }

  clearForm() {
    this.editing = false;
    this.slForm.reset();
  }

  deleteItem() {
    this.slService.deleteItem(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
