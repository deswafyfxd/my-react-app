/* CSS for truncating long names and showing full name on hover */
.track-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.track-label:hover::after {
  content: attr(data-fullname);
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 5px;
  z-index: 10;
}
