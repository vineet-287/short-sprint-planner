import React, { Component } from "react";
import Lightbox from "react-image-lightbox";

class Detail extends Component {
  state = {
    showLightBox: false
  };

  openLightbox = () => {
    this.setState({ showLightBox: true });
  };

  render() {
    const { storyObject } = this.props;
    return (
      <article className="kanban-entry detail">
        <div className="kanban-entry-inner">
          <div className="kanban-label">
            <div>
              <h2 className="pull-left" style={{ float: "left" }}>
                <a href="javascript:void(0)"># {storyObject.id}</a>{" "}
                <span>{storyObject.title}</span>
              </h2>
              <span className="pull-right" style={{ float: "right" }}>
                {storyObject.image_url && (
                  <span className="pull-right">
                    <a href="#" onClick={this.openLightbox}>
                      <i className="fa fa-paperclip" aria-hidden="true" />
                    </a>
                  </span>
                )}
              </span>
            </div>
            <p style={{ marginTop: "40px" }}>{storyObject.description}</p>

            {this.state.showLightBox === true && (
              <Lightbox
                mainSrc={storyObject.image_url}
                onCloseRequest={() => this.setState({ showLightBox: false })}
              />
            )}

            {storyObject.additional_notes && (
              <div className="row ml-1 mt-4">
                <span>Additional Notes: </span>
                {storyObject.additional_notes}
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }
}

export default Detail;
