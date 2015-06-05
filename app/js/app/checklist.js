goog.provide("example.Checklist");
goog.provide("example.Checklist.init");
goog.provide("example.ui.Checklist");

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.ui.Container.Orientation');
goog.require('goog.ui.ContainerRenderer');
goog.require('goog.ui.ControlRenderer');
goog.require('goog.ui.Control');
goog.require('goog.ui.registry');
goog.require('goog.ui.Component');
goog.require('goog.ui.Checkbox');
goog.require('goog.dom.classes');


/** @typedef {{id:string, text:string, checked: boolean}} */
example.ChecklistItem;

/**
 * @param {Array.<example.ChecklistItem>} items
 * @constructor
 */
example.Checklist = function(items) {
  /**
   * @type {Array.<example.ChecklistItem>}
   * @private
   */
  this.items_ = goog.array.clone(items);
}

/***********************
 *  example.Checklist  *
 ***********************/

/** @return {number} Number of items that have been checked off. */
example.Checklist.prototype.getItems = function() {
  // This ensures that a client cannot change the order of the items, but a clint will be able to mutate the items themselves.
  return goog.array.clone(this.items_);
}

/** @return {number} Number of itmes that have been checked off. */
example.Checklist.prototype.getNumChecked = function() {
  var numChecked = goog.array.reduce(this.items_, function(sum, item) {
    return item.checked ? sum + 1 : sum;
  }, 0);
  return /** @type {number} */ (numChecked);
}


/******************************
 *  example.ui.ChecklistItem  *
 ******************************/

/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
example.ui.ChecklistItemRenderer = function() {
  goog.base(this);
};
goog.inherits(example.ui.ChecklistItemRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(example.ui.ChecklistItemRenderer);

/** @type {string} */
example.ui.ChecklistItemRenderer.CSS_CLASS = 'example-checklist-item';

/** @inheritDoc */
example.ui.ChecklistItemRenderer.prototype.getCssClass = function() {
  return example.ui.ChecklistItemRenderer.CSS_CLASS;
}

/**
 * @param {example.ui.ChecklistItem} checklistItem
 * @return {Element}
 */
example.ui.ChecklistItemRenderer.prototype.createDom = function(checklistItem) {
  var el = goog.base(this, 'createDom', checklistItem);

  // checklistItem needs to have a DOM before its addChild() method can be invoked later in this method.
  checklistItem.setElementInternal(el);

  var dom = checklistItem.getDomHelper();
  var isItemChecked = checklistItem.isItemChecked();
  var checkboxState = isItemChecked ?
    goog.ui.Checkbox.State.CHECKED : goog.ui.Checkbox.State.UNCHECKED;

  var checkbox = new goog.ui.Checkbox(checkboxState, dom);
  checklistItem.addChild(checkbox, true /* opt_render */);

  var label = new example.ui.Label(checklistItem.getItemText());
  checklistItem.addChild(label, true /* opt_render */);

  checklistItem.setChecked(isItemChecked);

  return el;
}

/**
 * @param {example.ui.ChecklistItem} checklistItem
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 */
example.ui.ChecklistItemRenderer.prototype.decorate = function(
  checklistItem, element) {
    goog.base(this, 'decorate', checklistItem, element);

    var checkbox = new goog.ui.Checkbox();
    checklistItem.addChild(checkbox);
    checkbox.decorate(goog.dom.getFirstElementChild(element));
    checklistItem.getModel().checked = checkbox.isChecked();

    var label = new example.ui.Label();
    checklistItem.addChild(label);
    label.decorate(goog.dom.getNextElementSibling(checkbox.getElement()));
    checklistItem.getModel().text = label.getLabelText();

    return element;
  }

/**
 * A control that displays a ChecklistItem.
 * @param {example.ChecklistItem=} item
 * @param {example.ui.ChecklistItemRenderer=} renderer
 * @constructor
 * @extends {goog.ui.Control}
 */
example.ui.ChecklistItem = function (item, renderer) {
  goog.base(this, null /* content */, renderer);
  this.setSupportedState(goog.ui.Component.State.CHECKED, true);
  this.setAutoStates(goog.ui.Component.State.CHECKED, false);
  this.setSupportedState(goog.ui.Component.State.FOCUSED, false);

  if (!item) {
    item = {id: 'temp-' + goog.ui.IdGenerator.getInstance().getNextUniqueId(),
            text: '',
            checked: false};
  }

  this.setModel(item);
};
goog.inherits(example.ui.ChecklistItem, goog.ui.Control);

/**
 * @return {!example.ChecklistItem}
 * @override
 */
example.ui.ChecklistItem.prototype.getModel;

/** @return {boolean} */
example.ui.ChecklistItem.prototype.isItemChecked = function() {
  return this.getModel().checked;
}

/** @return {string} */
example.ui.ChecklistItem.prototype.getItemText = function() {
  return this.getModel().text;
}

/** @inheritDoc */
example.ui.ChecklistItem.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var checkbox = this.getChildAt(0);
  this.getHandler().listen(checkbox,
                          [goog.ui.Component.EventType.CHECK, goog.ui.Component.EventType.UNCHECK],
                          this.onCheckChange_);
};

/**
 * Update the internal Checklist when the checked state of the checkbox changes.
 * @param {goog.events.Event} e
 * @private
 */
example.ui.ChecklistItem.prototype.onCheckChange_ = function(e) {
  var isChecked = (e.type == goog.ui.Component.EventType.CHECK);
  this.getModel().checked = isChecked;
  this.setChecked(isChecked);
};

goog.ui.registry.setDefaultRenderer(example.ui.ChecklistItem,
                                    example.ui.ChecklistItemRenderer);

goog.ui.registry.setDecoratorByClassName(example.ui.ChecklistItemRenderer.CSS_CLASS,
        function() {
          return new example.ui.ChecklistItem();
        });


/**********************
 *  example.ui.Label  *
 **********************/

/** This is a simple component that displays some inline text.
 * @param {string=} labelText
 * @constructor
 * @extends {goog.ui.Component}
 */
example.ui.Label = function(labelText) {
  goog.base(this);

  /**
   * @type {string}
   * @private
   */
  this.labelText_ = goog.isDef(labelText) ? labelText : '';
};
goog.inherits(example.ui.Label, goog.ui.Component);

example.ui.Label.CSS_CLASS = 'example-label';

/** @return {string} */
example.ui.Label.prototype.getLabelText = function() {
  return this.labelText_;
}

/** @inheritDoc */
example.ui.Label.prototype.createDom = function() {
  var el = this.dom_.createDom('span',
                               undefined /* opt_render */,
                               this.labelText_);
  this.decorateInternal(el);
}

/** @inheritDoc */
example.ui.Label.prototype.decorateInternal = function(element) {
  goog.base(this, 'decorateInternal', element);
  this.labelText_ = element.firstChild.nodeVaue;
  goog.dom.classes.add(element, example.ui.Label.CSS_CLASS);
}


/**************************
 *  example.ui.Checklist  *
 **************************/

/**
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
example.ui.ChecklistRenderer = function() {
  goog.base(this);
};
goog.inherits(example.ui.ChecklistRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(example.ui.ChecklistRenderer);

/** @type {string} */
example.ui.ChecklistRenderer.CSS_CLASS = 'example-checklist';

/** @inheritDoc */
example.ui.ChecklistRenderer.prototype.getCssClass = function() {
  return example.ui.ChecklistRenderer.CSS_CLASS;
}

/**
 * @param {example.ui.Checklist} checklistContainer
 * @return {Element}
 */
example.ui.ChecklistRenderer.prototype.createDom = function(checklistContainer) {
  var el = goog.base(this, 'createDom', checklistContainer);
  checklistContainer.setElementInternal(el);

  var checklist = checklistContainer.getModel();
  var items = checklist.getItems();

  goog.array.forEach(items, function(item) {
    var control = new example.ui.ChecklistItem(item);
    checklistContainer.addChild(control, true /* opt_render */);
  });

  return el;
}


/**
 * @param {example.ui.Checklist} checklistContainer
 * @param {Element} element Element to decorate
 * @return {Element} Decorated element.
 */
example.ui.ChecklistRenderer.prototype.decorate = function(
  checklistContainer, element) {
    goog.base(this, 'decorate', checklistContainer, element);

    var items = [];
    checklistContainer.forEachChild(function(child) {
      items.push((/** @type {example.ui.ChecklistItem} */ (child)).getModel());
    });
    var checklist = new example.Checklist(items);
    checklistContainer.setModel(checklist);

    return element;
  }

/**
 * @param {example.Checklist=} checklist
 * @constructor
 * @extends {goog.ui.Container}
 */
example.ui.Checklist = function(checklist) {
  goog.base(this, goog.ui.Container.Orientation.VERTICAL,
           example.ui.ChecklistRenderer.getInstance());
  this.setModel(checklist || null);
  this.setFocusable(false);
}
goog.inherits(example.ui.Checklist, goog.ui.Container);

/**
 * @return {example.Checklist}
 * @override
 */
example.ui.Checklist.prototype.getModel;

/** @inheritDoc */
example.ui.Checklist.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(this,
        [goog.ui.Component.EventType.CHECK, goog.ui.Component.EventType.UNCHECK],
        this.onCheckChange_);
};

/**
 * @param {goog.event.Event} e
 * @private
 */
example.ui.Checklist.prototype.onCheckChange_ = function(e) {
  e.stopPropagation();
  this.dispatchEvent(new goog.events.Event(
    example.ui.Checklist.EventType.CHECKED_COUNT_CHANGED, this))
};

/** @enum {string} */
example.ui.Checklist.EventType = {
  CHECKED_COUNT_CHANGED: goog.events.getUniqueId('check-count-changed')
};

goog.ui.registry.setDefaultRenderer(example.ui.Checklist,
                                    example.ui.ChecklistRenderer);

goog.ui.registry.setDecoratorByClassName(example.ui.ChecklistRenderer.CSS_CLASS, function () {return new example.ui.Checklist(); });



/****************************
 *  example.Checklist.init  *
 ****************************/

example.Checklist.init = function() {
  var checklist = new example.Checklist([
    {id: '1', text: 'alpha', checked: true},
    {id: '2', text: 'bravo', checked: true},
    {id: '3', text: 'charlie', checked: false},
    {id: '4', text: 'delta', checked: true}
  ]);

  var container = new example.ui.Checklist(checklist);
  container.render(goog.dom.getElement('checklist'));

  var updateListenerCount = function() {
    goog.dom.getElement('listener-count').innerHTML =
      goog.events.getTotalListenerCount();
  };

  var updateNumChecked = function(e) {
    goog.dom.getElement('num-checked').innerHTML = e.target.getModel().getNumChecked();
  };

  goog.events.listen(
    container,
    example.ui.Checklist.EventType.CHECKED_COUNT_CHANGED,
    updateNumChecked
  );

  updateListenerCount();

  container.dispatchEvent(new goog.events.Event(
    example.ui.Checklist.EventType.CHECKED_COUNT_CHANGED));
}



